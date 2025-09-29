"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/** Types */
type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export default function CartScreen() {
  // Demo data — swap with your real cart state later
  const [items, setItems] = useState<CartItem[]>([
    { id: "1", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu-1.jpg" },
    { id: "2", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu-2.jpg" },
    { id: "3", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu-3.jpg" },
    { id: "4", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu-4.jpg" },
  ]);

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  const inc = (id: string) =>
    setItems(arr => arr.map(it => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));

  const dec = (id: string) =>
    setItems(arr => arr.map(it => (it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it)));

  const removeItem = (id: string) => setItems(arr => arr.filter(it => it.id !== id));

  return (
    <main className="min-h-screen bg-[rgba(255,252,241,1)] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-['Bebas_Neue'] text-[#073027] text-2xl tracking-wide">
            BON APPÉTIT SILOM
            <span className="align-middle ml-2 inline-block translate-y-[1px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#073027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <Link
            href="/menu"
            className="flex items-center justify-center h-[36px] px-4 rounded-[10px]
                       bg-[#EF9748] border-2 border-[#073027] text-[#073027]
                       font-['Bebas_Neue'] font-extrabold tracking-wide text-sm
                       shadow-[0_3px_0_0_#073027]
                       hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] hover:bg-[#FAB170]
                       active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027] transition-transform"
          >
            ADD MENU
          </Link>
        </div>

        {/* Frame */}
        <section className="rounded-2xl border border-[#e6d8c8] bg-white/60 shadow-[0_6px_18px_rgba(0,0,0,0.06)] px-4 py-5 md:px-6">
          <h2 className="font-['Bebas_Neue'] text-[#073027] text-xl tracking-wide mb-4">YOUR ORDERS</h2>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map(it => (
              <OrderLine
                key={it.id}
                item={it}
                onInc={() => inc(it.id)}
                onDec={() => dec(it.id)}
                onRemove={() => removeItem(it.id)}
              />
            ))}
          </div>

          {/* Total + checkout */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-[#073027] font-semibold">
              Total:{" "}
              <span className="font-['Bebas_Neue'] text-2xl tracking-wide">{total.toLocaleString()}B</span>
            </div>

            <button
              className="h-[44px] px-5 rounded-[12px] bg-[#b87a63] text-white font-semibold shadow
                         hover:brightness-95 active:scale-[0.99] transition"
              disabled={total === 0}
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ========== Subcomponents (kept inside the same file for simplicity) ========== */

function OrderLine({
  item,
  onInc,
  onDec,
  onRemove,
}: {
  item: CartItem;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid grid-cols-[88px_1fr_auto] gap-4 items-center">
      {/* image */}
      <div className="h-[84px] w-[88px] overflow-hidden rounded-lg bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      {/* middle */}
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[#073027] font-semibold leading-snug line-clamp-2">{item.name}</p>

          <div className="flex items-center gap-3 shrink-0">
            <button className="text-[#073027]/70 hover:underline text-sm">Edit</button>
            <button
              onClick={onRemove}
              className="text-[#ff4d55] text-lg leading-none"
              aria-label="Remove item"
              title="Remove"
            >
              ×
            </button>
          </div>
        </div>

        {/* qty */}
        <div className="mt-3 flex items-center gap-3">
          <QtyButton onClick={onDec} disabled={item.qty === 0} ariaLabel="Decrease">–</QtyButton>
          <div className="min-w-[44px] h-[32px] grid place-items-center rounded-md border-2 border-[#073027] text-[#073027]">
            {item.qty}
          </div>
          <QtyButton onClick={onInc} ariaLabel="Increase">+</QtyButton>
        </div>
      </div>

      {/* price */}
      <div className="text-right text-[#073027] font-semibold">{item.price}B</div>
    </div>
  );
}

function QtyButton({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className="h-[32px] w-[32px] grid place-items-center rounded-md
                 bg-[#F8E7C8] border-2 border-[#073027]
                 text-[#073027] font-bold
                 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
