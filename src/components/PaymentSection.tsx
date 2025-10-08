"use client";

import { useState } from "react";
import Image from "next/image";

type Brand = "visa" | "mastercard" | "mobile" | "cash" | "add";
type Option = { brand: Brand; label: string; masked?: string };

type Props = {
  className?: string;
  initial?: Option;
  onChange?: (opt: Option) => void;
  onAddMore?: () => void;
};

const OPTIONS: Option[] = [
  { brand: "visa", label: "Visa", masked: "1585 XXXX XXXX XXXX" },
  { brand: "mobile", label: "Mobile Banking", masked: "1585 XXXX XXXX XXXX" },
  { brand: "cash", label: "Cash On Delivery" },
];

export default function PaymentSection({
  className = "",
  initial = OPTIONS[0],
  onChange,
  onAddMore,
}: Props) {
  const [selected, setSelected] = useState<Option>(initial);
  const [open, setOpen] = useState(false);

  const choose = (opt: Option) => {
    setSelected(opt);
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <section
      aria-labelledby="payment-title"
      className={`w-full bg-[var(--page-bg,#FFFCF1)] py-10 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative">
            <h3
              id="payment-title"
              className="mb-5 text-[16px] md:text-[18px] font-extrabold tracking-[0.08em] text-[#0F3B2F] uppercase"
            >
              PAYMENT
            </h3>

            {/* Selected row */}
            <div className="flex items-center justify-between rounded-md px-6 py-5">
              <div className="flex items-center gap-5">
                <BrandMark brand={selected.brand} size={32} />
                <div className="leading-tight">
                  <div className="text-[16px] font-semibold text-[#2B2B2B]">
                    {selected.label}
                  </div>
                  {selected.masked && (
                    <div className="text-[12px] text-[#8C7B6A]">
                      {selected.masked}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="payment-popover"
                onClick={() => setOpen((v) => !v)}
                className="rounded-md p-1 outline-none ring-[#E09B4A] focus:ring-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0"
                  fill="none"
                  stroke="#E09B4A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span className="sr-only">Change payment method</span>
              </button>
            </div>

            {/* Dropdown menu */}
            {open && (
              <>
                <button
                  aria-hidden
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-10 h-full w-full cursor-default bg-black/0"
                />

                <div
                  id="payment-popover"
                  role="menu"
                  className="absolute z-20 right-0 mt-2 w-72 rounded-md border border-[#E5D6C2] bg-[#FFFCF1] shadow-lg"
                >
                  <div className="px-4 py-2 text-sm font-semibold text-[#0F3B2F] bg-[#F6EFE3] border-b border-[#E5D6C2]">
                    {selected.masked
                      ? `My ${selected.label} ending in ${selected.masked.slice(-2)}`
                      : `My ${selected.label}`}
                  </div>

                  <ul className="py-1">
                    {OPTIONS.map((opt) => {
                      const isActive = opt.brand === selected.brand;
                      return (
                        <li key={opt.brand}>
                          <button
                            role="menuitem"
                            onClick={() => choose(opt)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[14px] rounded-md transition hover:bg-[#FFF8ED] ${
                              isActive ? "bg-[#FFF4E1]" : ""
                            }`}
                          >
                            <BrandMark brand={opt.brand} size={24} />
                            <div className="flex-1 leading-tight">
                              <div className="font-semibold text-[#0F3B2F]">
                                {opt.label}
                              </div>
                              {opt.masked && (
                                <div className="text-[12px] text-[#8C7B6A]">
                                  {opt.masked}
                                </div>
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}

                    <li>
                      <button
                        role="menuitem"
                        onClick={() => {
                          setOpen(false);
                          onAddMore?.();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#0F3B2F] hover:bg-[#FFF8ED]"
                      >
                        <BrandMark brand="add" size={24} />
                        Add More
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

/* --- Brand logos --- */
function BrandMark({
  brand,
  size = 28,
}: {
  brand: Brand;
  size?: number;
}) {
  const logos: Record<Brand, { src?: string; alt: string }> = {
    visa: { src: "/images/payments/visa.svg", alt: "Visa" },
    mastercard: { src: "/images/payments/mastercard.svg", alt: "Mastercard" },
    mobile: { src: "/images/payments/mobile-banking.svg", alt: "Mobile Banking" },
    cash: { src: "/images/payments/cash.svg", alt: "Cash on Delivery" },
    add: { alt: "Add More" },
  };

  const cfg = logos[brand];

  if (!cfg.src) {
    if (brand === "add") {
      return (
        <div
          className="flex items-center justify-center rounded-full bg-[#E09B4A] text-white"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      );
    }
    return (
      <div
        className="flex items-center justify-center rounded-md border border-[#E5D6C2] text-[#0F3B2F] font-bold"
        style={{ width: size + 10, height: size }}
      >
        {brand.toUpperCase().slice(0, 2)}
      </div>
    );
  }

  return (
    <Image
      src={cfg.src}
      alt={cfg.alt}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}
