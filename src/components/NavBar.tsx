"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-black px-4 py-3">

        <Link href="/" className="text-xl font-bold">
          BON APPÉTIT
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/about">About Us</Link>
        </nav>

        <div className="hidden md:block">
          <Link href="/reserve" className="px-4 py-2 rounded bg-orange-500 text-white">
            Reserve a Table
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 py-3 space-y-2 border-t">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/about">About Us</Link>
          <Link href="/reserve" className="block">
            Reserve a Table
          </Link>
        </div>
      )}
    </header>
  );
}
