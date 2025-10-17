"use client";

import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children?: ReactNode;
  className?: string;
};

export default function Button({ 
  href, 
  children = "RESERVE A TABLE", // Default text
  className = ""
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center
        min-w-[140px] h-[44px] px-4 text-[13px]
        md:min-w-[180px] md:h-[56px] md:px-5 md:text-[15px]
        rounded-[12px] bg-[#EF9748] border-2 border-[#073027] text-[#073027] font-['Bebas_Neue'] font-extrabold
        shadow-[0_4px_0_0_#073027] md:shadow-[0_5px_0_0_#073027]
        hover:translate-y-[1px] hover:shadow-[0_4px_0_0_#073027] hover:bg-[#FAB170] transition-transform duration-150
        active:translate-y-[3px] active:shadow-[0_3px_0_0_#073027] ${className}`}
    >
      {children}
    </Link>
  );
}
