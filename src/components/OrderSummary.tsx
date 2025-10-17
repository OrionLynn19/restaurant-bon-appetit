"use client";

import Image from "next/image";
import React from "react";

type Props = {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  coupon: number;
  total: number;

  code: string;
  setCode: (v: string) => void;
  applying: boolean;
  applyError: string | null;
  applyCoupon: (code: string) => Promise<void>;
  applied: boolean;
  appliedDiscount: number;
  computedTotal: number;

  onConfirm?: () => void; 
  confirming?: boolean;

  className?: string;
  hideConfirmOnMobile?: boolean;
};

export default function OrderSummary({
  subtotal,
  deliveryFee,
  tax,
  coupon,
  total,

  code,
  setCode,
  applying,
  applyError,
  applyCoupon,
  applied,
  appliedDiscount,
  computedTotal,

  onConfirm,
  confirming = false,

  className = "",
  hideConfirmOnMobile = false,
}: Props) {
  const handleApplyClick = async () => {
    await applyCoupon(code);
  };

  const displayCoupon = applied
    ? Math.min(Math.max(0, Math.floor(appliedDiscount)), Math.max(0, Math.floor(subtotal)))
    : coupon;

  const displayTotal = applied ? computedTotal : total;

  return (
    <div className={className}>
      <h5 className="font-normal font-schibsted text-[14px] md:text-[20px] text-[#000000] mt-3">
        Discount Coupon
      </h5>

      <div className="flex justify-between mt-2 gap-2">
        <input
          type="text"
          placeholder="Promo Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex w-full md:w-auto min-w-0 rounded-sm px-2 bg-[#FFFFFF] border-white shadow-lg font-schibsted text-[14px] md:text-[20px]"
        />
        <button
          onClick={handleApplyClick}
          disabled={applying}
          className="bg-[#EF9748] font-bebas text-[14px] md:text-[20px] shadow-[0_3px_0_0_#073027] rounded-[8px] border-2 border-[#073027] px-3 py-1  hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                  transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {applying ? "Applying..." : "Apply"}
        </button>
      </div>

      {applyError && (
        <p className="mt-2 text-[12px] md:text-[14px] text-red-600 font-schibsted">
          {applyError}
        </p>
      )}
      {applied && !applyError && (
        <p className="mt-2 text-[12px] md:text-[14px] text-[#073027] font-schibsted">
          Coupon applied. Discount: {displayCoupon}B
        </p>
      )}

      <div className="flex justify-between text-[14px] md:text-[20px] font-schibsted mt-4 ">
        <p>Subtotal</p>
        <p>{subtotal}B</p>
      </div>
      <div className="flex justify-between text-[14px] md:text-[20px] font-schibsted mt-4">
        <p>Delivery Fee</p>
        <p>{deliveryFee}B</p>
      </div>
      <div className="flex justify-between text-[14px] md:text-[20px] font-schibsted mt-4">
        <p>Tax(7%)</p>
        <p>{tax}B</p>
      </div>
      <div className="flex justify-between text-[14px] md:text-[20px] font-schibsted mt-4">
        <div className="flex gap-0.5">
          <Image src="/images/couponicon.svg" alt="Coupon" width={20} height={20} />
          <p>Coupon</p>
        </div>
        <p>-{displayCoupon}B</p>
      </div>

      <p className="w-full h-[2px] bg-[#073027] mt-3"></p>

      <div className="flex justify-between text-[14px] md:text-[20px] font-schibsted mt-4">
        <p>Total</p>
        <p>{displayTotal}B</p>
      </div>

      <div
        className={`${hideConfirmOnMobile ? "hidden md:flex" : "flex"
          } justify-center md:justify-end text-[20px] font-bebas mt-4`}
      >
        <button
          onClick={onConfirm}
          disabled={confirming}
          className="w-full md:w-auto bg-[#EF9748] shadow-[0_3px_0_0_#073027] rounded-[8px] border-2 border-[#073027] px-5 py-1  
            hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] 
            active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
            transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {confirming ? "PROCESSING..." : "CONFIRM ORDER"}
        </button>
      </div>
    </div>
  );
}
