"use client";
import React from "react";
import Image from "next/image";

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

  const {
    addressLeft = (
      <Image
        src="/images/locationIcon.png"
        alt="Edit address"
        width={20}
        height={20}
        className="object-contain"
      />
    ),
    editRight = (
      <span
        className="h-5 w-5 bg-current
                  [mask-image:url('/images/editIcon.png')]
                  [mask-size:contain]
                  [mask-repeat:no-repeat]
                  [mask-position:center]"
        aria-hidden="true"
      />
    ),
    spotLeft,
    chevron = (
      <Image
        src="/images/chevronIcon.png"
        alt="Edit address"
        width={20}
        height={20}
        className="object-contain"
      />
    ),
    optionPlace = (
      <Image
        src="/images/deskIcon.png"
        alt="Edit address"
        width={24}
        height={24}
        className="object-contain"
      />
    ),
    optionHand = (
      <Image
        src="/images/handIcon.png"
        alt="Edit address"
        width={24}
        height={24}
        className="object-contain"
      />
    ),
    optionPerson = (
      <Image
        src="/images/leaveIcon.png"
        alt="Edit address"
        width={24}
        height={24}
        className="object-contain"
      />
    ),
  } = icons || {};

  const rowCls =
    "bg-white shadow-[0_2px_0_0_rgba(7,48,39,0.16)] min-h-[56px] px-3 py-[14px]";

  const currentSpotIcon = React.useMemo(() => {
    switch (spot) {
      case "Hand It To Me":
        return optionHand;
      case "Leave It With Someone":
        return optionPerson;
      default:
        return optionPlace;
    }
  }, [spot, optionPlace, optionHand, optionPerson]);

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
          <div className="h-6 w-6 shrink-0 text-[#0D4A3E] flex items-center justify-center">
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
            className="flex items-center justify-center h-9 w-9 text-[#EA7D33] hover:text-black focus:outline-none"
            aria-label="Edit"
          >
            {editRight}
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
                {currentSpotIcon}
              </div>
              <span className={`truncate text-[20px] leading-7 text-[#0D4A3E]`}>
                {spot ?? "Place At Given Spot"}
              </span>
            </div>
            <div className="flex items-center justify-center h-9 w-9">
              {chevron}
            </div>
          </button>
          <button
            aria-hidden={!open}
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className={`fixed inset-0 bg-black/20 ${open ? "block" : "hidden"}`}
          />
          <div
            className={`${
              open ? "block" : "hidden"
            } absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden bg-white shadow-lg`}
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
