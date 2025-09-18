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
      className="inline-block bg-[#e98c42] border-2 border-green-900 text-green-900 font-bold px-5 py-2 rounded shadow-sm hover:bg-[#d67a35] transition"
    >
      {children}
    </Link>
  );
}
