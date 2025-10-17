// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "@/app/api/cart/_utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type CartItemLite = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string | null;
};

type CartItemRow = {
  id: string | number | null;
  name: string | null;
  price: number | string | null;
  qty: number | string | null;
  image: string | null;
};

type CouponRow = {
  id: string;
  code: "percent" | "fixed" | string; // code is a string; type is below
  type: "percent" | "fixed";
  amount: number | string;
  starts_at: string | null;
  ends_at: string | null;
  min_subtotal: number | string | null;
  is_active: boolean;
  applicable_product_ids: string[] | null;
};

function clampDiscount(subtotal: number, discount: number): number {
  const d = Math.max(0, Math.floor(discount));
  return Math.min(d, Math.max(0, Math.floor(subtotal)));
}

async function readCart(cartId: string): Promise<{ items: CartItemLite[]; subtotal: number }> {
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,name,price,qty,image")
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);

  const rows: CartItemRow[] = Array.isArray(data) ? (data as CartItemRow[]) : [];
  const items: CartItemLite[] = rows.map((r) => ({
    id: String(r.id ?? ""),
    name: String(r.name ?? ""),
    price: toNumber(r.price),
    qty: toNumber(r.qty),
    image: r.image ? String(r.image) : null,
  }));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  return { items, subtotal };
}

function applicableSubtotalForCoupon(coupon: CouponRow, items: CartItemLite[]): number {
  if (!coupon.applicable_product_ids || coupon.applicable_product_ids.length === 0) {
    return items.reduce((s, it) => s + it.price * it.qty, 0);
  }
  const allow = new Set(coupon.applicable_product_ids);
  return items.filter((it) => allow.has(it.id)).reduce((s, it) => s + it.price * it.qty, 0);
}

export async function POST(req: Request) {
  try {
    // ensure we have a cart (cookie helper is sync)
    const cartId = await getOrCreateCartId();

    // read cart
    const { items, subtotal } = await readCart(cartId);
    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    // read body (optional inputs)
    type Body = { coupon_code?: string; delivery_fee?: number; tax_rate?: number };
    const body = (await req.json().catch(() => ({} as unknown))) as Body;

    const coupon_code =
      typeof body?.coupon_code === "string" ? body.coupon_code.trim().toUpperCase() : "";
    const delivery_fee = Number.isFinite(body?.delivery_fee) ? Number(body.delivery_fee) : 0;
    const tax_rate = Number.isFinite(body?.tax_rate) ? Number(body.tax_rate) : 0.07;

    // compute discount (lookup coupon if provided; DOES NOT touch your existing coupon API)
    let discount = 0;
    if (coupon_code) {
      const { data: rows, error } = await supabaseAdmin
        .from("coupons")
        .select(
          "id, code, type, amount, starts_at, ends_at, min_subtotal, is_active, applicable_product_ids"
        )
        .ilike("code", coupon_code)
        .limit(1);

      if (error) throw new Error(error.message);

      const coupon = (rows?.[0] as CouponRow | undefined) ?? null;
      if (coupon && coupon.is_active) {
        const now = new Date().toISOString();
        const startsOk = !coupon.starts_at || coupon.starts_at <= now;
        const endsOk = !coupon.ends_at || coupon.ends_at >= now;
        const minOk = subtotal >= toNumber(coupon.min_subtotal);

        if (startsOk && endsOk && minOk) {
          const applicableSubtotal = applicableSubtotalForCoupon(coupon, items);
          const amount = toNumber(coupon.amount);
          discount = coupon.type === "percent" ? (applicableSubtotal * amount) / 100 : amount;
          discount = clampDiscount(subtotal, discount);
        }
      }
    }

    const tax = Math.round(subtotal * tax_rate);
    const total = Math.max(0, subtotal + delivery_fee + tax - discount);

    // create order
    const { data: orderIns, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        cart_id: cartId,
        subtotal,
        delivery_fee,
        tax,
        discount,
        total,
        coupon_code: coupon_code || null,
      })
      .select("id,created_at,subtotal,delivery_fee,tax,discount,total,coupon_code")
      .single();

    if (orderErr || !orderIns) {
      return NextResponse.json(
        { error: orderErr?.message || "Create order failed" },
        { status: 500 }
      );
    }

    // copy items into order_items
  const lines = items.map((it) => ({
  id: crypto.randomUUID(), // generate unique id for each line
  order_id: orderIns.id,
  item_id: it.id,
  name: it.name,
  price: it.price,
  qty: it.qty,
  image: it.image,
}));

const { error: lineErr } = await supabaseAdmin.from("order_items").insert(lines);

if (lineErr) {
  console.error("Insert order_items failed:", lineErr.message);
  return NextResponse.json({ error: lineErr.message }, { status: 500 });
}

    // clear cart (best-effort)
    await supabaseAdmin.from("cart_items").delete().eq("cart_id", cartId);

    return NextResponse.json({ order: orderIns, items }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Create order failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
