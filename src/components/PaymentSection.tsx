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
  { brand: "mastercard", label: "Mastercard", masked: "5329 XXXX XXXX 2211" },
  { brand: "mobile", label: "Mobile Banking" },
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
      className={`w-full bg-[var(--page-bg,#FFFCF1)] py-14 md:py-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative">
            <h3
              id="payment-title"
              className="mb-6 text-[20px] md:text-[22px] font-extrabold tracking-[0.08em] text-[#0F3B2F] uppercase"
            >
              PAYMENT
            </h3>

            {/* Selected row (scaled up) */}
            <div className="flex items-center justify-between rounded-xl bg-[#FFF9F0] px-8 py-6 shadow-sm">
              <div className="flex items-center gap-6">
                <BrandMark brand={selected.brand} size={54} />
                <div className="leading-tight">
                  <div className="text-[18px] md:text-[20px] font-semibold text-[#2B2B2B]">
                    {selected.label}
                  </div>
                  {selected.masked && (
                    <div className="mt-1 text-[14px] md:text-[15px] text-[#8C7B6A]">
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
                className="rounded-full p-2 transition hover:bg-[#FFF4E1] focus:ring-2 focus:ring-[#E09B4A]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="#E09B4A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span className="sr-only">Change payment method</span>
              </button>
            </div>

            {/* Dropdown menu (scaled up) */}
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
                  className="absolute z-20 right-0 mt-3 w-80 rounded-xl border border-[#E5D6C2] bg-[#FFFCF1] shadow-xl"
                >
                  <div className="px-5 py-3 text-base font-semibold text-[#0F3B2F] bg-[#F6EFE3] border-b border-[#E5D6C2]">
                    {selected.masked
                      ? `My ${selected.label} ending in ${selected.masked.slice(-2)}`
                      : `My ${selected.label}`}
                  </div>

                  <ul className="py-2">
                    {OPTIONS.map((opt) => {
                      const isActive = opt.brand === selected.brand;
                      return (
                        <li key={opt.brand}>
                          <button
                            role="menuitem"
                            onClick={() => choose(opt)}
                            className={`w-full flex items-center gap-4 px-5 py-3 text-left text-[16px] rounded-lg transition hover:bg-[#FFF8ED] ${
                              isActive ? "bg-[#FFF4E1]" : ""
                            }`}
                          >
                            <BrandMark brand={opt.brand} size={36} />
                            <div className="flex-1 leading-tight">
                              <div className="font-semibold text-[#0F3B2F]">
                                {opt.label}
                              </div>
                              {opt.masked && (
                                <div className="text-[13px] text-[#8C7B6A]">
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
                        className="w-full flex items-center gap-4 px-5 py-3 text-[16px] text-[#0F3B2F] hover:bg-[#FFF8ED]"
                      >
                        <BrandMark brand="add" size={32} />
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
    visa: { src: "/images/Visa.png", alt: "Visa" }, // <- ensure exact filename/case
    mastercard: { src: "/images/mastercard.png", alt: "Mastercard" },
    mobile: { src: "/images/mobilebanking.png", alt: "Mobile Banking" },
    cash: { src: "/images/COD.png", alt: "Cash on Delivery" },
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
