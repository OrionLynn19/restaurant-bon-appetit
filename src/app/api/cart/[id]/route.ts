import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "@/app/api/cart/_utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// Update quantity for a single cart line
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const cartId = await getOrCreateCartId();
    const itemId = decodeURIComponent(params.id);

    // body: { qty: number }
    const raw = await req.json().catch(() => ({} as Record<string, unknown>));
    const qty = Math.max(0, toNumber((raw as { qty?: number | string }).qty));

    // if qty <= 0, just delete the item (UI often does this)
    if (qty <= 0) {
      await supabaseAdmin.from("cart_items").delete().eq("id", itemId).eq("cart_id", cartId);
    } else {
      const { error: updErr } = await supabaseAdmin
        .from("cart_items")
        .update({ qty })
        .eq("id", itemId)
        .eq("cart_id", cartId);

      if (updErr) {
        return NextResponse.json({ error: updErr.message }, { status: 500 });
      }
    }

    // return fresh snapshot (what your UI expects)
    const { data, error: getErr } = await supabaseAdmin
      .from("cart_items")
      .select("id,name,price,qty,image")
      .eq("cart_id", cartId)
      .order("id", { ascending: true });

    if (getErr) {
      return NextResponse.json({ error: getErr.message }, { status: 500 });
    }

    const items = (data ?? []).map((r) => ({
      id: String(r.id),
      name: String(r.name ?? ""),
      price: toNumber(r.price),
      qty: toNumber(r.qty),
      image: r.image ? String(r.image) : null,
    }));
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

    return NextResponse.json({ items, subtotal }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to update item";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Delete a single cart line
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const cartId = await getOrCreateCartId();
    const itemId = decodeURIComponent(params.id);

    const { error: delErr } = await supabaseAdmin
      .from("cart_items")
      .delete()
      .eq("id", itemId)
      .eq("cart_id", cartId);

    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }

    const { data, error: getErr } = await supabaseAdmin
      .from("cart_items")
      .select("id,name,price,qty,image")
      .eq("cart_id", cartId)
      .order("id", { ascending: true });

    if (getErr) {
      return NextResponse.json({ error: getErr.message }, { status: 500 });
    }

    const items = (data ?? []).map((r) => ({
      id: String(r.id),
      name: String(r.name ?? ""),
      price: toNumber(r.price),
      qty: toNumber(r.qty),
      image: r.image ? String(r.image) : null,
    }));
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

    return NextResponse.json({ items, subtotal }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to delete item";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
