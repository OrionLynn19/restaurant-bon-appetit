// src/app/api/cart/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "@/app/api/cart/_utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 params is a Promise here
) {
  try {
    const { id: itemId } = await params;            // 👈 await it
    const cartId = await getOrCreateCartId();

    // 1) Delete the line
    const { error: delErr } = await supabaseAdmin
      .from("cart_items")
      .delete()
      .eq("id", itemId)
      .eq("cart_id", cartId);

    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }

    // 2) Return the updated cart snapshot
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
