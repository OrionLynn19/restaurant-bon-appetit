"use client";
import Image from "next/image";
import React from "react";

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
};

type OrderResponse = {
  order: {
    id: string;
    created_at: string;
    subtotal: number;
    delivery_fee: number;
    tax: number;
    discount: number;
    total: number;
    coupon_code: string | null;
  };
  items: Array<{
    id: string;
    name: string;
    qty: number;
    price: number;
    image: string;
  }>;
  meta?: {
    order_date_human?: string;
    order_time_human?: string;
  };
};

type Props = {
  orderId?: string;
  onMeta?: (createdAtISO: string) => void;
};

function Row({
  label,
  value,
  className = "",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function maskOrderId(id: string) {
  if (!id) return "—";
  const clean = id.replace(/-/g, "");
  return clean.slice(0, 6) + "xxxxxx";
}

// ---- NEW: type-safe helper (no `any`) ----
function readErrorField(x: unknown): string | null {
  if (typeof x === "object" && x !== null && "error" in x) {
    const v = (x as { error: unknown }).error;
    return typeof v === "string" ? v : null;
  }
  return null;
}

export default function OrderDetails({ orderId, onMeta }: Props) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [items, setItems] = React.useState<OrderItem[]>([]);
  const [subtotal, setSubtotal] = React.useState(0);
  const [deliveryFee, setDeliveryFee] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [coupon, setCoupon] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [createdAt, setCreatedAt] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!orderId) {
        setError("Missing order id");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
          cache: "no-store",
          credentials: "include",
        });
        const json: unknown = await res.json();

        const errMsg = readErrorField(json);
        if (!res.ok || errMsg) {
          throw new Error(errMsg ?? "Failed to load order");
        }
        if (cancelled) return;

        const data = json as OrderResponse;

        setItems(
          (data.items ?? []).map((it) => ({
            id: String(it.id),
            name: String(it.name ?? ""),
            qty: Number(it.qty ?? 0),
            price: Number(it.price ?? 0),
            image: it.image || "",
          }))
        );

        setSubtotal(Number(data.order.subtotal ?? 0));
        setDeliveryFee(Number(data.order.delivery_fee ?? 0));
        setTax(Number(data.order.tax ?? 0));
        setTotal(Number(data.order.total ?? 0));
        setCoupon(Number(data.order.discount ?? 0));
        setCreatedAt(data.order.created_at);

        onMeta?.(data.order.created_at);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load order");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [orderId, onMeta]);

  return (
    <section className="text-[#073027] font-['Schibsted_Grotesk']">
      <h3 className="text-[22px] md:text-[40px] font-['Bebas_Neue'] tracking-wide uppercase mb-1">
        Order Details
      </h3>
      <p className="text-[13px] md:text-[20px] text-[#6B7280] mb-4">
        Order Confirmation Number : {orderId ? maskOrderId(orderId) : "—"}
      </p>

      {loading && <p className="text-sm text-[#6B7280]">Loading order…</p>}

      {error && !loading && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="space-y-3 md:space-y-5 mb-5">
            {items.map((it) => (
              <div
                key={it.id}
                className="grid grid-cols-[72px_1fr_auto] items-start gap-3 md:grid-cols-[180px_1fr_auto] md:gap-6"
              >
                <div className="relative h-[72px] w-[72px] md:h-[180px] md:w-[180px] overflow-hidden rounded-md">
                  {it.image ? (
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="(min-width: 768px) 180px, 72px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#eef2f1]" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-[15px] md:text-[18px] leading-tight">{it.name}</p>
                  <p className="mt-1 md:mt-5 text-[13px] md:text-[18px]">
                    Qty: <span className="text-[#073027]">{it.qty}</span>
                  </p>
                </div>

                <div className="pl-2 text-[14px] md:text-[18px] tabular-nums">
                  {it.price}B
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-[15px] md:text-[18px]">
            <Row label="Subtotal" value={`${subtotal}B`} />
            <Row label="Delivery Fee" value={`${deliveryFee}B`} />
            <Row label="Tax(7%)" value={`${tax}B`} />
            <Row
              label={
                <span className="inline-flex items-center gap-1">
                  <Image src="/images/mdi_coupon.png" width={15} height={15} alt="coupon icon" />
                  Coupon
                </span>
              }
              value={`-${coupon}B`}
            />
            <div className="mt-2 h-px w-full border-t border-[#073027]" />
            <Row
              label={<span className="font-semibold">Total</span>}
              value={<span className="font-semibold">{total}B</span>}
              className="pt-1"
            />
          </div>

          <time dateTime={createdAt} className="hidden">
            {createdAt}
          </time>
        </>
      )}
    </section>
  );
}