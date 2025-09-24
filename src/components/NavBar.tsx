"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface NavLinkItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

interface NavLinkProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { href: "/", label: "HOME" },
  { href: "/menu", label: "MENU" },
  { href: "/contact", label: "CONTACT US" },
  { href: "/about", label: "ABOUT US" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  // Navigation Link Component
  const NavLink = ({ href, label }: NavLinkProps) => {
    const isActive = pathname === href;
    // Home link: lighter font weight, others: normal, active: bold
    const isHome = label === "Home";
    // Use 24px for mobile menu, 20px for desktop
    const isMobileMenu =
      isMenuOpen && typeof window !== "undefined" && window.innerWidth < 768;
    return (
      <Link
        href={href}
        onClick={closeMenu}
        className={`px-3 py-2 flex items-center gap-1 transition-all duration-200 font-bebas
          ${isMobileMenu ? "text-[24px]" : "text-[21px]"}
          ${
            isActive
              ? isHome
                ? "font-medium text-black"
                : "font-bold text-black"
              : "text-black"
          }
          md:hover:text-[#EF9748] md:rounded-lg`}
        style={{
          height: "46px",
          lineHeight: "26px",
          paddingTop: "0",
          paddingBottom: "0",
          fontFamily:
            "var(--font-bebas), Bebas Neue, Arial, Helvetica, sans-serif",
          fontWeight: isActive ? (isHome ? 500 : 700) : 500,
          transition: "font-weight 0.2s ease, background 0.2s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        {label}
      </Link>
    );
  };

  // Mobile Menu Component
  const MobileMenu = () => (
    <div
      className="fixed inset-0 z-[999] animate-in slide-in-from-top duration-300"
      style={{ background: "#FFFCF1" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b border-white/20 bg-white"
        style={{ padding: "16px" }}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/images/eleva_logo.png"
            alt="Elevaclinic logo"
            width={43}
            height={32}
            className="object-contain"
            priority
          />
        </Link>
        <button
          onClick={closeMenu}
          className="rounded-xl px-3 py-2 hover:bg-white/50 transition-all duration-200 flex items-center justify-center"
          style={{
            color: "#AF674F",
            width: "24px",
            height: "24px",
            fontSize: "16px",
          }}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-5 px-[28px]">
        <nav className="flex flex-col" style={{ gap: "6px" }}>
          {NAV_LINKS.map((link) => (
            <div key={link.href}>
              <NavLink {...link} />
              <hr className="text-black" style={{ margin: "4px 0 0 0" }} />
            </div>
          ))}
          {/* Reserve a Table Button under last hr */}
          <Link
            href="/reserve"
            onClick={closeMenu}
            className="w-fit mt-8 shadow-[0_4px_6px_-1px_black] border-1 rounded-md bg-[#EF9748] text-black px-5 font-bebas text-[24px] text-center"
            style={{
              fontFamily:
                "var(--font-bebas), Bebas Neue, Arial, Helvetica, sans-serif",
              fontWeight: 400,
            }}
          >
            Reserve a Table
          </Link>
        </nav>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Hide header content when mobile menu is open */}
      <div
        className={`flex items-center justify-between w-[375px] h-16 p-4 opacity-100 md:w-full md:h-[115px] md:px-8 ${
          isMenuOpen ? "hidden" : ""
        }`}
      >
        {/* Logo - Responsive sizes */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold md:py-5 md:px-4"
        >
          {/* Mobile: eleva_logo.png, Desktop: logo-and-title.png */}
          <span className="block md:hidden">
            <Image
              src="/images/eleva_logo.png"
              alt="Elevaclinic logo"
              width={43}
              height={32}
              className="object-contain w-[43px] h-[32px]"
              priority
            />
          </span>
          <span className="hidden md:block">
            <Image
              src="/images/logo-and-title.png"
              alt="Elevaclinic logo"
              width={216}
              height={60}
              className="object-contain md:w-[216px] md:h-[75px]"
              priority
            />
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[20px] font-bebas">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Reserve a Table Button (Desktop) */}
        <Link
          href="/reserve"
          className="hidden md:inline-block shadow-md rounded-lg bg-[#EF9748] text-black px-6 py-3 font- ml-6 transition hover:bg-[#d97d2a] font-bebas text-[20px]"
          style={{
            fontFamily:
              "var(--font-bebas), Bebas Neue, Arial, Helvetica, sans-serif",
          }}
        >
          RESERVE A TABLE
        </Link>

        {/* Mobile Hamburger - hide when menu is open */}
        <button
          onClick={openMenu}
          className={`md:hidden rounded-xl hover:bg-white/50 transition-all duration-200 flex items-center justify-center ${
            isMenuOpen ? "hidden" : ""
          }`}
          style={{
            color: "#AF674F",
            width: "24px",
            height: "24px",
            fontSize: "16px",
          }}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Portal */}
      {isMenuOpen &&
        typeof window !== "undefined" &&
        createPortal(<MobileMenu />, document.body)}
    </header>
  );
}
