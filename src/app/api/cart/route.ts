// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "@/app/api/cart/_utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type AddBody = {
  id: string;                    // required (your menu/sku id)
  name?: string;                 // optional
  price?: number | string;       // optional, defaults 0 if missing
  qty?: number | string;         // optional, defaults to 1
  image?: string | null;         // optional
};

type CartRow = {
  id: string | number;
  name: string | null;
  price: number | string | null;
  qty: number | string | null;
  image: string | null;
};

export async function POST(req: Request) {
  try {
    const cartId = await getOrCreateCartId();

    // ---- Parse body (no `any`) ----
    const raw = await req.json().catch(() => ({}));
    const body: AddBody =
      typeof raw === "object" && raw !== null ? (raw as AddBody) : ({} as AddBody);

    const id = String(body.id ?? "").trim();
    if (!id) {
      return NextResponse.json(
        { error: "Missing item id." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const name = (body.name ?? "").toString();
    const qty = Math.max(1, toNumber(body.qty ?? 1));
    const price = Number.isFinite(toNumber(body.price)) ? toNumber(body.price) : 0;
    const image = typeof body.image === "string" ? body.image : null;

    // ---- Upsert: if exists, increment qty; else insert ----
    const { data: existing, error: existErr } = await supabaseAdmin
      .from("cart_items")
      .select("id,qty")
      .eq("cart_id", cartId)
      .eq("id", id)
      .maybeSingle();

    if (existErr) {
      return NextResponse.json(
        { error: existErr.message },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (existing) {
      const currentQty = toNumber((existing as { qty: number | string }).qty);
      const { error: updErr } = await supabaseAdmin
        .from("cart_items")
        .update({ qty: currentQty + qty })
        .eq("cart_id", cartId)
        .eq("id", id);

      if (updErr) {
        return NextResponse.json(
          { error: updErr.message },
          { status: 500, headers: { "Cache-Control": "no-store" } }
        );
      }
    } else {
      const { error: insErr } = await supabaseAdmin.from("cart_items").insert({
        cart_id: cartId,
        id,
        name,
        price,
        qty,
        image,
      });
      if (insErr) {
        return NextResponse.json(
          { error: insErr.message },
          { status: 500, headers: { "Cache-Control": "no-store" } }
        );
      }
    }

    // ---- Return fresh snapshot ----
    const { data, error } = await supabaseAdmin
      .from("cart_items")
      .select("id,name,price,qty,image")
      .eq("cart_id", cartId)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    const rows: CartRow[] = (data ?? []) as CartRow[];
    const items = rows.map((r) => ({
      id: String(r.id),
      name: String(r.name ?? ""),
      price: toNumber(r.price),
      qty: toNumber(r.qty),
      image: r.image ? String(r.image) : null,
    }));
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

    return NextResponse.json(
      { items, subtotal },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to add to cart";
    return NextResponse.json(
      { error: msg },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
export async function GET() {
  try {
    const cartId = await getOrCreateCartId();

    const { data, error } = await supabaseAdmin
      .from("cart_items")
      .select("id,name,price,qty,image")
      .eq("cart_id", cartId)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    type Row = {
      id: string | number;
      name: string | null;
      price: number | string | null;
      qty: number | string | null;
      image: string | null;
    };

    const rows: Row[] = (data ?? []) as Row[];
    const items = rows.map((r) => ({
      id: String(r.id),
      name: String(r.name ?? ""),
      price: toNumber(r.price),
      qty: toNumber(r.qty),
      image: r.image ? String(r.image) : null,
    }));

    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

    return NextResponse.json(
      { items, subtotal },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to load cart";
    return NextResponse.json(
      { error: msg },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}