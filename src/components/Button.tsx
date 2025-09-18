"use client";

import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center
                 px-4 py-1.5 text-sm font-bold uppercase tracking-wide
                 rounded-md border-2
                 text-[#0b3d2e] border-[#0b3d2e]
                 bg-[#e39a5b] shadow-[0_2px_0_#0b3d2e]
                 hover:bg-[#d18548] transition"
      style={{ minWidth: "180px" }} // keeps it narrower + text centered
    >
      {children}
    </Link>
  );
}
