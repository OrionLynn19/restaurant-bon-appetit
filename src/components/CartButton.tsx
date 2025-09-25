"use client";

import Link from "next/link";

type CartButtonProps = {
  count?: number;
};

export default function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#e9b992] px-4 py-2 text-sm font-semibold text-[#073027] shadow-lg hover:bg-[#d8a87f] transition"
      aria-label="Go to Cart"
    >
      <span className="uppercase tracking-wide">Go to Cart</span>
      <span className="relative">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#073027"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {count > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold">
            {count}
          </span>
        )}
      </span>
    </Link>
  );
}
