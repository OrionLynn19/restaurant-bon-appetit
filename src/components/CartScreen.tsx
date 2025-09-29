"use client";

import Link from "next/link";
import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>([
    { id: "1", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 2, image: "/images/menu1.png" },
    { id: "2", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu2.png" },
    { id: "3", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu3.png" },
    { id: "4", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/Hungry3.jpg" },
  ]);

  const inc = (id: string) =>
    setItems(arr => arr.map(it => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const dec = (id: string) =>
    setItems(arr => arr.map(it => (it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it)));
  const removeItem = (id: string) => setItems(arr => arr.filter(it => it.id !== id));

  return (
    <main className="min-h-screen bg-[#FFFCEF] px-4 py-6 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Title centered */}
        <div className="mb-8 flex justify-center">
          <div className="font-['Bebas_Neue'] text-[#073027] text-[36px] tracking-wide">
            BON APPÉTIT SILOM
            <span className="ml-2 inline-block translate-y-[2px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="#EF9748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Row: YOUR ORDERS (left) + ADD MENU (right) */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-['Bebas_Neue'] text-[#073027] text-[28px] tracking-wide">
            YOUR ORDERS
          </h2>
         <Link
            href="/menu"
            className="
                inline-flex items-center justify-center
                h-[38px] px-6
                rounded-[8px] border-2 border-[#073027]
                bg-[#EF9748] text-[#073027]
                font-['Bebas_Neue'] text-[15px] tracking-wide uppercase font-normal
                shadow-[0_3px_0_0_#073027]
                hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027]
                active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                transition-transform duration-150
            "
            >
            ADD MENU
            </Link>




        </div>

        {/* Orders grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map((it) => (
            <OrderRow
              key={it.id}
              item={it}
              onInc={() => inc(it.id)}
              onDec={() => dec(it.id)}
              onRemove={() => removeItem(it.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

/* ---------- Row component (scaled up + aligned like pic 1) ---------- */
function OrderRow({
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
    /* 3 columns, 2 rows: 
       col1 = image (spans 2 rows)
       col2 = title (row1) + stepper (row2)
       col3 = Edit/× (row1) + price (row2)
    */
    <div className="grid grid-cols-[172px_1fr_auto] grid-rows-[auto_auto] items-start gap-6">
      {/* Image spans both rows */}
      <div className="row-span-2 h-[172px] w-[172px] overflow-hidden rounded-[14px] bg-[#F2F2F2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      {/* Title (row 1, col 2) */}
      <div className="row-start-1 col-start-2 min-w-0">
        <p className="max-w-[560px] font-semibold text-[20px] leading-snug text-[#073027]">
          {item.name}
        </p>
      </div>

      {/* Edit + × (row 1, col 3) — top-right like the reference */}
      <div className="row-start-1 col-start-3 ml-3 shrink-0 space-x-4 pt-1 justify-self-end">
        <button className="text-[15px] text-[#073027]/85 hover:underline">Edit</button>
        <button
          onClick={onRemove}
          className="text-[18px] leading-none text-[#FF4D55]"
          aria-label="Remove"
          title="Remove"
        >
          ×
        </button>
      </div>

      {/* Stepper (row 2, col 2) */}
      <div className="row-start-2 col-start-2 flex items-center gap-4">
        <PeachBtn onClick={onDec} disabled={item.qty === 0} ariaLabel="Decrease">–</PeachBtn>

        <div className="grid h-[42px] min-w-[56px] place-items-center rounded-[8px]
                        border-2 border-[#073027] text-[#073027] text-[18px] font-semibold">
          {item.qty}
        </div>

        <PeachBtn onClick={onInc} ariaLabel="Increase">+</PeachBtn>
      </div>

      {/* Price (row 2, col 3) — aligns with stepper row on the right */}
      <div className="row-start-2 col-start-3 justify-self-end self-center text-right text-[18px] font-semibold text-[#073027]">
        {item.price}B
      </div>
    </div>
  );
}


/* ---------- Reusable peach button (minus/plus) ---------- */
function PeachBtn({
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
      className="
        grid h-[42px] w-[42px] place-items-center rounded-[8px]
        bg-[#F3C08C] border-2 border-[#073027] text-[#073027] text-[20px] font-bold
        shadow-[0_3px_0_0_#073027]
        hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027]
        active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-transform
      "
    >
      {children}
    </button>
  );
}
