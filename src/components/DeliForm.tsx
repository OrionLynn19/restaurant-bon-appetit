"use client";
import React from "react";

export type DeliverySpot =
  | "Place At Given Spot"
  | "Hand It To Me"
  | "Leave It With Someone";

export type Mode = "delivery" | "pickngo";

type IconSlots = {
  addressLeft?: React.ReactNode;
  editRight?: React.ReactNode;
  spotLeft?: React.ReactNode;
  chevron?: React.ReactNode;
  optionPlace?: React.ReactNode;
  optionHand?: React.ReactNode;
  optionPerson?: React.ReactNode;
};

type Props = {
  mode?: Mode;
  address: string;
  onAddressChange?: (addr: string) => void;
  spot?: DeliverySpot;
  onSpotChange?: (s: DeliverySpot) => void;
  icons?: IconSlots;
  className?: string; 
};

export default function DeliForm({
  mode = "delivery",
  address,
  onAddressChange,
  spot,
  onSpotChange,
  icons,
  className = "",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const {
    addressLeft = <span className="text-xl">📍</span>,
    editRight = <span className="text-xl text-[#EA7D33]">✏️</span>,
    spotLeft = <span className="text-xl">🛏️</span>,
    chevron,
    optionPlace = <span className="text-xl">🛏️</span>,
    optionHand = <span className="text-xl">🤝</span>,
    optionPerson = <span className="text-xl">👤</span>,
  } = icons || {};

  const rowCls =
    "bg-white shadow-[0_2px_0_0_rgba(7,48,39,0.16)] min-h-[56px] px-5 py-[14px]";

  return (
    <section
      className={`font-['Schibsted_Grotesk'] px-4 md:px-10 w-full max-w-[560px] ${className}`}
    >
      <h2 className="mb-4 text-[8px] md:text-[20px] font-bold text-[#073027]">
        {mode === "delivery" ? "DELIVERY INFORMATION" : "PICKUP LOCATION"}
      </h2>
      <div
        className={`relative mb-3 ${rowCls} ${
          open && mode === "delivery" ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 shrink-0 text-[#0D4A3E] [&>*]:h-6 [&>*]:w-6">
            {addressLeft}
          </div>

          {editing ? (
            <input
              value={address}
              onChange={(e) => onAddressChange?.(e.target.value)}
              placeholder="Angel Home Apartment, LakHok..."
              className="min-w-0 flex-1 truncate text-[20px] leading-7 text-[#0D4A3E] p-0 focus:outline-none"
            />
          ) : (
            <span
              className="flex-1 truncate text-[20px] leading-7 text-[#0D4A3E]"
              onClick={() => setEditing(true)}
            >
              {address || "Tap to enter address"}
            </span>
          )}

          <button
            type="button"
            onClick={() => setEditing((s) => !s)}
            className="grid h-9 w-9 place-items-center hover:bg-[#EA7D33]/10 focus:outline-none focus:ring-2 focus:ring-[#EA7D33]"
            aria-label="Edit"
          >
            <div className="[&>*]:h-5 [&>*]:w-5">{editRight}</div>
          </button>
        </div>
      </div>

      {mode === "delivery" && (
        <div className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className={`flex w-full items-center justify-between ${rowCls}`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-6 w-6 shrink-0 text-[#0D4A3E] [&>*]:h-6 [&>*]:w-6">
                {spotLeft}
              </div>
              <span
                className={`truncate text-[20px] leading-7 ${
                  !spot || spot === "Place At Given Spot"
                    ? "text-[#7C928C]"
                    : "text-[#0D4A3E]"
                }`}
              >
                {spot ?? "Place At Given Spot"}
              </span>
            </div>
            {chevron ?? (
              <svg
                viewBox="0 0 24 24"
                className={`h-6 w-6 text-[#EA7D33] transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            )}
          </button>

          <button
            aria-hidden={!open}
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className={`fixed inset-0 bg-black/20 ${open ? "block" : "hidden"}`}
          />

          <div
            className={`${open ? "block" : "hidden"} absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden bg-white shadow-lg`}
            role="listbox"
          >
            <button
              role="option"
              aria-selected={spot === "Place At Given Spot"}
              onClick={() => {
                onSpotChange?.("Place At Given Spot");
                setOpen(false);
              }}
              className="flex w-full items-center gap-4 px-5 py-5 text-left hover:bg-[#F2F2F2]"
            >
              <div className="[&>*]:h-6 [&>*]:w-6 text-[#0D4A3E]">
                {optionPlace}
              </div>
              <span className="text-[20px] leading-7 text-[#0D4A3E]">
                Place At Given Spot
              </span>
            </button>

            <button
              role="option"
              aria-selected={spot === "Hand It To Me"}
              onClick={() => {
                onSpotChange?.("Hand It To Me");
                setOpen(false);
              }}
              className="flex w-full items-center gap-4 px-5 py-5 text-left hover:bg-[#F2F2F2]"
            >
              <div className="[&>*]:h-6 [&>*]:w-6 text-[#0D4A3E]">
                {optionHand}
              </div>
              <span className="text-[20px] leading-7 text-[#0D4A3E]">
                Hand It To Me
              </span>
            </button>

            <button
              role="option"
              aria-selected={spot === "Leave It With Someone"}
              onClick={() => {
                onSpotChange?.("Leave It With Someone");
                setOpen(false);
              }}
              className="flex w-full items-center gap-4 px-5 py-5 text-left hover:bg-[#F2F2F2]"
            >
              <div className="[&>*]:h-6 [&>*]:w-6 text-[#0D4A3E]">
                {optionPerson}
              </div>
              <span className="text-[20px] leading-7 text-[#0D4A3E]">
                Leave It With Someone
              </span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
