// src/app/api/coupon/validate/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "@/app/api/cart/_utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type CouponRow = {
  id: string;
  code: string;
  type: "percent" | "fixed";
  amount: number | string;
  starts_at: string | null;
  ends_at: string | null;
  min_subtotal: number | string | null;
  is_active: boolean;
  applicable_product_ids: string[] | null;
};

type CartItemLite = { id: string; price: number; qty: number };

function normalizeCode(raw: unknown): string {
  return String(raw ?? "").trim().toUpperCase();
}

function clampDiscount(subtotal: number, discount: number): number {
  const d = Math.max(0, Math.floor(discount));
  return Math.min(d, Math.max(0, Math.floor(subtotal)));
}

async function readCartItems(cartId: string): Promise<{ subtotal: number; items: CartItemLite[] }> {
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,price,qty")
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);

  const items: CartItemLite[] = (data ?? []).map((r) => ({
    id: String(r.id),
    price: toNumber(r.price),
    qty: toNumber(r.qty),
  }));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  return { subtotal, items };
}

function applicableSubtotalForCoupon(coupon: CouponRow, items: CartItemLite[]): number {
  // If coupon has no product restriction, apply to all items
  if (!coupon.applicable_product_ids || coupon.applicable_product_ids.length === 0) {
    return items.reduce((s, it) => s + it.price * it.qty, 0);
  }
  const allow = new Set(coupon.applicable_product_ids);
  return items
    .filter((it) => allow.has(it.id))
    .reduce((s, it) => s + it.price * it.qty, 0);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { code?: string };
    const code = normalizeCode(body.code);

    if (!code) {
      return NextResponse.json(
        { valid: false, reason: "Coupon code is required." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const cartId = await getOrCreateCartId();
    const { subtotal, items } = await readCartItems(cartId);

    // load coupon (case-insensitive)
    const { data: rows, error } = await supabaseAdmin
      .from("coupons")
      .select(
        "id, code, type, amount, starts_at, ends_at, min_subtotal, is_active, applicable_product_ids"
      )
      .ilike("code", code)
      .limit(1);

    if (error) {
      return NextResponse.json(
        { valid: false, reason: error.message },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    const coupon = (rows?.[0] as CouponRow | undefined) ?? null;
    if (!coupon) {
      return NextResponse.json(
        { valid: false, reason: "Coupon not found." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (!coupon.is_active) {
      return NextResponse.json(
        { valid: false, reason: "Coupon is inactive." },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    // time window checks (compare ISO strings)
    const now = new Date().toISOString();
    if (coupon.starts_at && coupon.starts_at > now) {
      return NextResponse.json(
        { valid: false, reason: "Coupon is not active yet." },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    if (coupon.ends_at && coupon.ends_at < now) {
      return NextResponse.json(
        { valid: false, reason: "Coupon has expired." },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    // minimum subtotal check
    const minSubtotal = toNumber(coupon.min_subtotal);
    if (subtotal < minSubtotal) {
      return NextResponse.json(
        {
          valid: false,
          reason: `Requires a minimum subtotal of ${minSubtotal}.`,
          subtotal,
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const applicableSubtotal = applicableSubtotalForCoupon(coupon, items);

    // compute discount
    const amount = toNumber(coupon.amount);
    let discount = 0;
    if (coupon.type === "percent") {
      discount = (applicableSubtotal * amount) / 100;
    } else {
      discount = amount;
    }
    discount = clampDiscount(subtotal, discount);

    const total = Math.max(0, Math.floor(subtotal - discount));

    return NextResponse.json(
      {
        valid: discount > 0,
        reason: discount > 0 ? undefined : "No discount applicable.",
        coupon: { code: coupon.code, type: coupon.type, amount: amount },
        discount,
        subtotal,
        total,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Coupon validation failed.";
    return NextResponse.json(
      { valid: false, reason: msg },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
