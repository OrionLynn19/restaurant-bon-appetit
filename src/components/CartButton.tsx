"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartButtonProps = { count?: number };

export default function CartButton({ count = 1 }: CartButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
  href="/cart"
  aria-label="Go to Cart"
  className={`
    fixed bottom-32 right-10 z-50
    flex items-center justify-center gap-2
    min-w-[150px] md:min-w-[160px] h-[48px] px-5   /* ⬅️ narrower pill */
    rounded-md border border-[#8b3d00]
    bg-[#e86c1a] text-[#073027]
    shadow-md
    opacity-40
    hover:opacity-80
    active:opacity-100 active:bg-[#b84a00] active:text-white
    transition-all duration-300 ease-out
    ${visible ? "scale-100" : "scale-75 opacity-0"}
  `}
>
  <span className="font-['Bebas_Neue'] font-extrabold uppercase tracking-wide">
    Go to Cart
  </span>

  <span className="relative flex items-center">
    {/* cart icon */}
    <svg
      width="20"
      height="20"
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
</Link>

  );
}
