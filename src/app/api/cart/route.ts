import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateCartId, toNumber } from "./_utils";

type CartItemRow = {
  id: string;
  cart_id: string;
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

export async function GET() {
  const cartId = await getOrCreateCartId();
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,name,price,qty,image")
    .eq("cart_id", cartId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data ?? []) as CartItemRow[];
  const { subtotal, count } = calc(items);
  return NextResponse.json({ items, subtotal, count });
}

export async function POST(req: Request) {
  const cartId = await getOrCreateCartId();
  const body = await req.json() as {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
  };

  // See if this line already exists for this cart
  const { data: existing, error: selErr } = await supabaseAdmin
    .from("cart_items")
    .select("id,qty")
    .eq("cart_id", cartId)
    .eq("id", body.id)
    .maybeSingle();

  if (selErr) {
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }

  if (existing) {
    const newQty = toNumber(existing.qty) + toNumber(body.qty);
    const { error: updErr } = await supabaseAdmin
      .from("cart_items")
      .update({ qty: newQty })
      .eq("cart_id", cartId)
      .eq("id", body.id);

    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }
  } else {
    const { error: insErr } = await supabaseAdmin
      .from("cart_items")
      .insert({
        id: body.id,
        cart_id: cartId,
        name: body.name,
        price: body.price,
        qty: body.qty,
        image: body.image,
      });

    if (insErr) {
      return NextResponse.json({ error: insErr.message }, { status: 500 });
    }
  }

  // Return the refreshed cart snapshot
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("id,name,price,qty,image")
    .eq("cart_id", cartId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ items: data ?? [] });
}
