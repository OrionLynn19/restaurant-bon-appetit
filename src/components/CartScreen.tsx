// src/components/CartScreen.tsx
"use client";

import Link from "next/link";
import { useCart, CartItem } from "../context/CartContext";

export default function CartScreen() {
  const { items, inc, dec, removeItem } = useCart();

  return (
    <main className="bg-[#FFFCEF]">
      <div className="mx-auto w-full max-w-7xl">
        {/* Store title row (center only) */}
        <div className="flex justify-center items-center pt-6 pb-2">
          <div className="font-['Bebas_Neue'] text-[#073027] text-[28px] md:text-[36px] tracking-wide">
            BON APPÉTIT SILOM
            <span className="ml-2 inline-block translate-y-[2px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#EF9748"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Orders header row (left title, right Add Menu) */}
        <div className="flex items-center justify-between mt-6 mb-6">
          <h2 className="font-['Bebas_Neue'] text-[#073027] text-[20px] md:text-[28px] tracking-wide">
            YOUR ORDERS
          </h2>

          <Link
            href="/menu"
            className="
              inline-flex items-center justify-center
              h-[34px] px-4 md:h-[38px] md:px-6
              rounded-[8px] border-2 border-[#073027]
              bg-[#EF9748] text-[#073027]
              font-['Bebas_Neue'] text-[14px] md:text-[15px] tracking-wide uppercase font-normal
              shadow-[0_3px_0_0_#073027]
              hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027]
              active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
              transition-transform duration-150
            "
          >
            ADD MENU
          </Link>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <p className="text-[#073027] text-lg md:text-xl mb-6">Your cart is empty</p>
            <Link
              href="/menu"
              className="
                inline-flex items-center justify-center
                h-[44px] px-6 rounded-[10px]
                border-2 border-[#073027]
                bg-[#EF9748] text-[#073027]
                font-['Bebas_Neue'] text-[16px] tracking-wide uppercase
                shadow-[0_3px_0_0_#073027]
                hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027]
                active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                transition-transform duration-150
              "
            >
              BROWSE MENU
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:gap-x-12 md:gap-y-12 md:grid-cols-2">
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
        )}
      </div>
    </main>
  );
}

/* ---------- Row ---------- */
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
  const lineTotal = item.price * item.qty;

  return (
    <div
      className="
        grid grid-cols-[112px_1fr_auto] md:grid-cols-[172px_1fr_auto]
        grid-rows-[auto_auto]
        gap-4 md:gap-6 items-start
      "
    >
      {/* Image spans both rows */}
      <div className="row-span-2 h-[112px] w-[112px] md:h-[172px] md:w-[172px] overflow-hidden rounded-[12px] bg-[#F2F2F2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      {/* Row 1: Title (left) */}
      <div className="row-start-1 col-start-2 min-w-0">
        <p className="font-semibold text-[#073027] text-[16px] md:text-[20px] leading-snug">
          {item.name}
        </p>
      </div>

      {/* Row 1: Edit / × (right) */}
      <div className="row-start-1 col-start-3 justify-self-end flex items-start gap-3">
        <button className="text-[14px] md:text-[15px] text-[#073027]/85 hover:underline">Edit</button>
        <button onClick={onRemove} className="text-[18px] leading-none text-[#FF4D55]" aria-label="Remove">
          ×
        </button>
      </div>

      {/* Row 2: Stepper (left) */}
      <div className="row-start-2 col-start-2 flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
        <PeachBtn onClick={onDec} disabled={item.qty === 0} ariaLabel="Decrease" />
        <div
          className="grid place-items-center rounded-[8px] border-2 border-[#073027] text-[#073027]
                     h-9 min-w-[44px] text-[16px] font-semibold
                     md:h-[42px] md:min-w-[56px] md:text-[18px]"
        >
          {item.qty}
        </div>
        <PeachBtn onClick={onInc} ariaLabel="Increase" plus />
      </div>

      {/* Row 2: Price (right) - show line total only */}
      <div className="row-start-2 col-start-3 self-end justify-self-end">
        <div className="h-9 md:h-[42px] flex items-center text-right text-[#073027] font-semibold text-[16px] md:text-[18px]">
          {lineTotal}B
        </div>
      </div>
    </div>
  );
}

/* ---------- Button ---------- */
function PeachBtn({
  onClick,
  disabled,
  ariaLabel,
  plus = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  plus?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className="
        h-9 w-9 md:h-[42px] md:w-[42px] aspect-square
        grid place-items-center px-0 rounded-[8px]
        bg-[#F3C08C] border-2 border-[#073027] text-[#073027]
        shadow-[0_3px_0_0_#073027]
        hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027]
        active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-transform
      "
    >
      <span className="text-[18px] md:text-[20px] leading-none translate-y-[0.5px]">
        {plus ? "+" : "–"}
      </span>
    </button>
  );
}
