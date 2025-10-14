"use client";

import Image from "next/image";
import React from "react";

type Props = {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  coupon: number;
  total: number;
  onApply?: (code: string) => void;
  onConfirm?: () => void;
  className?: string;
  hideConfirmOnMobile?: boolean;
};

export default function OrderSummary({
  subtotal,
  deliveryFee,
  tax,
  coupon,
  total,
  onApply,
  onConfirm,
  className = "",
  hideConfirmOnMobile = false,
}: Props) {
  const [code, setCode] = React.useState("");

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
          className="flex w-full md:w-auto min-w-0 rounded-sm px-2 bg-[#FFFFFF] border-white shadow-lg font-schibsted text-[14px] md:text-[20px] "
        />
        <button
          onClick={() => onApply?.(code)}
          className="bg-[#EF9748] font-bebas text-[14px] md:text-[20px] shadow-[0_3px_0_0_#073027] rounded-[8px] border-2 border-[#073027] px-3 py-1  hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                  transition-transform duration-150"
        >
          Apply
        </button>
      </div>
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
          <Image
            src="/images/couponicon.svg"
            alt="Coupon"
            width={20}
            height={20}
          />
          <p>Coupon</p>
        </div>
        <p>{coupon}B</p>
      </div>
      <p className=" w-full h-[2px] bg-[#073027] mt-3"></p>
      <div className="flex justify-between text-[14px] md:text-[20px] font-schibsted mt-4">
        <p>Total</p>
        <p>{total}B</p>
      </div>
      <div
        className={`${
          hideConfirmOnMobile ? "hidden md:flex" : "flex"
        } justify-center md:justify-end text-[20px] font-bebas mt-4`}
      >
        <button
          onClick={() => onConfirm?.()}
          className="w-full md:w-auto bg-[#EF9748] shadow-[0_3px_0_0_#073027] rounded-[8px] border-2 border-[#073027] px-5 py-1  hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                  transition-transform duration-150"
        >
          CONFIRM ORDER
        </button>
      </div>
    </div>
  );
}
