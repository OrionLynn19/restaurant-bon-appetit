import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "../_utils";

export async function POST(req: Request) {
  const cartId = await getOrCreateCartId();
  const body = await req.json();
  const { id, name, price, qty, image } = body || {};

  // 1) try increment existing
  const { data: existing, error: selErr } = await supabaseAdmin
    .from("cart_items")
    .select("id,qty")
    .eq("cart_id", cartId)
    .eq("id", id)
    .maybeSingle();

  if (selErr) {
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }

  if (existing) {
    const nextQty = toNumber(existing.qty) + toNumber(qty ?? 0);
    if (nextQty <= 0) {
      await supabaseAdmin.from("cart_items").delete().eq("id", id).eq("cart_id", cartId);
    } else {
      const { error: updErr } = await supabaseAdmin
        .from("cart_items")
        .update({ qty: nextQty })
        .eq("id", id)
        .eq("cart_id", cartId);
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
    }
  } else {
    // 2) insert new line
    const { error: insErr } = await supabaseAdmin.from("cart_items").insert({
      id,
      cart_id: cartId,
      name,
      price,
      qty: toNumber(qty ?? 0),
      image,
    });
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  // return fresh cart
  const { data: items, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,name,price,qty,image")
    .eq("cart_id", cartId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const subtotal = (items ?? []).reduce(
    (s, it) => s + toNumber(it.price) * toNumber(it.qty),
    0
  );
  const count = (items ?? []).reduce((s, it) => s + toNumber(it.qty), 0);

  return NextResponse.json({ items: items ?? [], subtotal, count });
}
