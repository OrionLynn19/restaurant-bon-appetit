"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartButton() {
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
        fixed bottom-6 md:bottom-32 right-2 md:right-6 z-50
        flex items-center justify-center
        h-12 w-12 rounded-md              /* 🔑 square with rounded corners on mobile */
        md:h-[48px] md:w-auto md:min-w-[150px] md:px-5 md:rounded-md
        border border-[#8b3d00]
        bg-[#e86c1a] text-[#073027]
        shadow-md
        opacity-40 hover:opacity-80
        active:opacity-100 active:bg-[#b84a00] active:text-white
        transition-all duration-300 ease-out
        ${visible ? "scale-100" : "scale-75 opacity-0"}
      `}
    >
      {/* text: hidden on mobile, shown on md+ */}
      <span className="hidden md:inline font-['Bebas_Neue'] font-extrabold uppercase tracking-wide">
        Go to Cart
      </span>

      {/* icon */}
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
    </Link>
  );
}
