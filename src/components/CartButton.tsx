// src/components/CartButton.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const [visible, setVisible] = useState(false);
  const { count } = useCart();
  const disabled = count === 0;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const wrapper =
    `fixed bottom-6 md:bottom-32 right-2 md:right-6 z-50
     transition-all duration-300 ease-out
     ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`;

  // same square look & colors
  const buttonBox =
    `relative flex items-center justify-center gap-2
     h-12 w-12 rounded-md
     md:h-[48px] md:w-auto md:min-w-[150px] md:px-5 md:rounded-md
     border border-[#8b3d00]
     bg-[#e86c1a] text-[#073027]
     shadow-md`;

  const content = (isDisabled: boolean) => (
    <span className={`${buttonBox} ${isDisabled ? "opacity-70" : ""}`}>
      <CornerBadge count={count} />
      <CartIcon />
      <span className="hidden md:inline font-['Bebas_Neue'] font-extrabold uppercase tracking-wide">
        Go to Cart
      </span>
    </span>
  );

  if (disabled) {
    return (
      <button
        aria-label="Go to Cart (empty)"
        disabled
        className={`${wrapper} cursor-not-allowed`}
      >
        {content(true)}
      </button>
    );
  }

  return (
    <Link href="/cart" aria-label="Go to Cart" className={wrapper}>
      {content(false)}
    </Link>
  );
}

function CornerBadge({ count }: { count: number }) {
  return (
    <span
      className="
        absolute -top-2 -right-2
        grid place-items-center
        h-5 min-w-5 px-1 rounded-full
        bg-[#073027] text-white
        text-[11px] font-bold leading-none
        border border-[#073027]/80
      "
      aria-label={`Items in cart: ${count}`}
    >
      {count}
    </span>
  );
}

function CartIcon() {
  return (
    <span className="relative flex items-center md:ml-1">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </span>
  );
}
