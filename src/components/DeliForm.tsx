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
  mode = "delivery", // default
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
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

  return (
    <section className={`font-['Schibsted_Grotesk'] ${className}`}>
      <h2 className="mb-4 text-3xl font-extrabold tracking-wide text-[#0D4A3E]">
        {mode === "delivery" ? "DELIVERY INFORMATION" : "PICKUP LOCATION"}
      </h2>

      {/* Address / Pickup row */}
      <div
        className={`relative mb-4 rounded-xl bg-white px-5 py-5 shadow-[0_2px_0_0_rgba(7,48,39,0.16)] ${
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
              className="min-w-0 flex-1 truncate text-[20px] leading-7 text-[#0D4A3E] p-2
                        placeholder:text-[#0D4A3E]/50
                        focus:outline-none focus:ring-2 focus:ring-[#b8b8b8] focus:border-transparent"
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
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-[#EA7D33]/10 focus:outline-none focus:ring-2 focus:ring-[#EA7D33]"
            aria-label="Edit"
          >
            <div className="[&>*]:h-5 [&>*]:w-5">{editRight}</div>
          </button>
        </div>
      </div>

      {/* Delivery instructions (only if mode=delivery) */}
      {mode === "delivery" && (
        <div className="relative">
          {/* Trigger button */}
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-5 py-5 shadow-[0_2px_0_0_rgba(7,48,39,0.16)]"
          >
            <div className="flex min-w-0 items-center gap-3 p-2">
              <span className="text-xl">🛏️</span>
              <span
            className={`truncate text-[20px] leading-7 ${
              !spot
                ? "text-[#7C928C]"
                : "text-[#0D4A3E]"
            }`}
              >
            {spot ?? "Place At Given Spot"}
              </span>
            </div>
            <svg
              viewBox="0 0 24 24"
              className={`h-6 w-6 text-[#EA7D33] transition-transform ${
            open ? "rotate-180" : ""
              }`}
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          {/* Overlay */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 z-10"
            />
          )}

          {/* Dropdown panel */}
          {open && (
            <div
              className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl bg-white shadow-lg"
              role="listbox"
            >
              <button
            className={`flex w-full items-center gap-4 px-5 py-5 text-left transition-colors ${
              spot === "Place At Given Spot"
                ? "bg-white hover:bg-[#D4D2D2]/50 font-semibold"
                : "bg-white hover:bg-[#D4D2D2]/50"
            }`}
            onClick={() => {
              onSpotChange?.("Place At Given Spot");
              setOpen(false);
            }}
              >
            🛏️ <span>Place At Given Spot</span>
              </button>

              <button
            className={`flex w-full items-center gap-4 px-5 py-5 text-left transition-colors ${
              spot === "Hand It To Me"
                ? "bg-white hover:bg-[#D4D2D2]/50 font-semibold"
                : "bg-white hover:bg-[#D4D2D2]/50"
            }`}
            onClick={() => {
              onSpotChange?.("Hand It To Me");
              setOpen(false);
            }}
              >
            🤝 <span>Hand It To Me</span>
              </button>

              <button
            className={`flex w-full items-center gap-4 px-5 py-5 text-left transition-colors ${
              spot === "Leave It With Someone"
                ? "bg-white hover:bg-[#D4D2D2]/50 font-semibold"
                : "bg-white hover:bg-[#D4D2D2]/50"
            }`}
            onClick={() => {
              onSpotChange?.("Leave It With Someone");
              setOpen(false);
            }}
              >
            👤 <span>Leave It With Someone</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
