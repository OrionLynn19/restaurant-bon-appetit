import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// Shape of rows we read from order_items
type OrderItemRow = {
  id: string | number | null;
  item_id: string | number | null;
  name: string | null;
  price: number | string | null;
  qty: number | string | null;
  image: string | null;
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> } // keep Promise form if your Next version requires awaiting
) {
  try {
    const { id } = await params;

    // load order
    const { data: order, error: oErr } = await supabaseAdmin
      .from("orders")
      .select("id,created_at,subtotal,delivery_fee,tax,discount,total,coupon_code")
      .eq("id", id)
      .single();

    if (oErr || !order) {
      return NextResponse.json(
        { error: oErr?.message || "Order not found" },
        { status: 404 }
      );
    }

    // load items
    const { data: rows, error: iErr } = await supabaseAdmin
      .from("order_items")
      .select("id,item_id,name,price,qty,image")
      .eq("order_id", id)
      .order("id", { ascending: true });

    if (iErr) {
      return NextResponse.json({ error: iErr.message }, { status: 500 });
    }

    const arr: OrderItemRow[] = Array.isArray(rows) ? (rows as OrderItemRow[]) : [];
    const items = arr.map((r) => ({
      id: String(r.item_id ?? r.id ?? ""),
      name: String(r.name ?? ""),
      price: Number(r.price ?? 0),
      qty: Number(r.qty ?? 0),
      image: r.image ? String(r.image) : "",
    }));

    // (optional) human-readable date/time
    const created = new Date(order.created_at);
    const order_date_human = created.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const order_time_human = created.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

    return NextResponse.json({
      order,
      items,
      meta: { order_date_human, order_time_human },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to load order";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
