// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId } from "./_utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type CartItemRow = {
  id: string;
  name: string | null;
  price: number | string | null;
  qty: number | string | null;
  image: string | null;
  cart_id?: string;
};

type ItemInput = {
  id: string;
  name: string;
  price: number | string;
  qty: number | string;
  image: string;
};

type Snapshot = {
  items: Array<{ id: string; name: string; price: number; qty: number; image: string }>;
  subtotal: number;
  count: number;
};

function toNum(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function normalize(rows: CartItemRow[]): Snapshot["items"] {
  return (rows ?? []).map((it) => ({
    id: String(it.id),
    name: String(it.name ?? ""),
    price: toNum(it.price),
    qty: toNum(it.qty),
    image: String(it.image ?? ""),
  }));
}

function calc(rows: CartItemRow[]) {
  const subtotal = (rows ?? []).reduce((s, it) => s + toNum(it.price) * toNum(it.qty), 0);
  const count = (rows ?? []).reduce((s, it) => s + toNum(it.qty), 0);
  return { subtotal, count };
}

async function fetchItems(cartId: string): Promise<Snapshot> {
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,name,price,qty,image")
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);
  const items = normalize((data ?? []) as CartItemRow[]);
  const { subtotal, count } = calc((data ?? []) as CartItemRow[]);
  return { items, subtotal, count };
}

export async function GET() {
  try {
    const cartId = await getOrCreateCartId();
    const payload = await fetchItems(cartId);
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "GET cart failed";
    return NextResponse.json({ error: msg }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(req: Request) {
  try {
    const cartId = await getOrCreateCartId();

    const body: unknown = await req.json().catch(() => ({}));
    const rawItems: ItemInput[] =
      typeof body === "object" && body !== null
        ? Array.isArray((body as { items?: ItemInput[] }).items)
          ? (body as { items: ItemInput[] }).items
          : (("id" in body &&
              "name" in body &&
              "price" in body &&
              "qty" in body &&
              "image" in body) as boolean)
          ? [
              {
                id: String((body as ItemInput).id),
                name: String((body as ItemInput).name),
                price: (body as ItemInput).price,
                qty: (body as ItemInput).qty,
                image: String((body as ItemInput).image),
              },
            ]
          : []
        : [];

    if (rawItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid body. Expect {id,name,price,qty,image} or {items:[...]}." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    for (const it of rawItems) {
      const id = String(it.id ?? "").trim();
      const name = String(it.name ?? "");
      const price = toNum(it.price);
      const qty = Math.max(1, toNum(it.qty));
      const image = String(it.image ?? "");
      if (!id) {
        return NextResponse.json(
          { error: "Missing required field: id" },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        );
      }

      const { data: existing, error: selErr } = await supabaseAdmin
        .from("cart_items")
        .select("qty")
        .eq("cart_id", cartId)
        .eq("id", id)
        .maybeSingle();

      if (selErr) throw new Error(selErr.message);

      if (!existing) {
        const { error: insErr } = await supabaseAdmin.from("cart_items").insert({
          cart_id: cartId,
          id,
          name,
          price,
          qty,
          image,
        });
        if (insErr) throw new Error(insErr.message);
      } else {
        const nextQty = toNum(existing.qty) + qty;
        const { error: updErr } = await supabaseAdmin
          .from("cart_items")
          .update({ qty: nextQty })
          .eq("cart_id", cartId)
          .eq("id", id);
        if (updErr) throw new Error(updErr.message);
      }
    }

    const payload = await fetchItems(cartId);
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "POST cart failed";
    return NextResponse.json({ error: msg }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
