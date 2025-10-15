import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "@/app/api/cart/_utils";

type CartItemRow = {
  id: string;
  name: string | null;
  price: number | string | null;
  qty: number | string | null;
  image: string | null;
};

function calc(items: CartItemRow[]) {
  const subtotal = (items ?? []).reduce(
    (s, it) => s + toNumber(it.price) * toNumber(it.qty),
    0
  );
  const count = (items ?? []).reduce((s, it) => s + toNumber(it.qty), 0);
  return { subtotal, count };
}

async function readCart(cartId: string) {
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,name,price,qty,image")
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);
  const items = (data ?? []) as CartItemRow[];
  const { subtotal, count } = calc(items);
  return { items, subtotal, count };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const cartId = await getOrCreateCartId();
  const { qty } = (await req.json()) as { qty: number };
  const q = toNumber(qty);

  if (q <= 0) {
    await supabaseAdmin.from("cart_items").delete().eq("id", params.id).eq("cart_id", cartId);
  } else {
    const { error } = await supabaseAdmin
      .from("cart_items")
      .update({ qty: q })
      .eq("id", params.id)
      .eq("cart_id", cartId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  try {
    const snapshot = await readCart(cartId);
    return NextResponse.json(snapshot);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const cartId = await getOrCreateCartId();
  const { error } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("id", params.id)
    .eq("cart_id", cartId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    const snapshot = await readCart(cartId);
    return NextResponse.json(snapshot);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
