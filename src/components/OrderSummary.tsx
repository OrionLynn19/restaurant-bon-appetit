"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

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
  const [applying, setApplying] = React.useState(false);
  const [applyError, setApplyError] = React.useState<string | null>(null);

  const [applied, setApplied] = React.useState(false);
  const [appliedDiscount, setAppliedDiscount] = React.useState<number>(0);
  const [computedTotal, setComputedTotal] = React.useState<number>(total);

  const router = useRouter();
  const [confirming, setConfirming] = React.useState(false);

  React.useEffect(() => {
    if (!applied) setComputedTotal(total);
  }, [total, applied]);

  React.useEffect(() => {
    if (!applied) return;
    const cappedDiscount = Math.min(
      Math.max(0, Math.floor(appliedDiscount)),
      Math.max(0, Math.floor(subtotal))
    );
    const newTotal = Math.max(
      0,
      Math.floor(subtotal + deliveryFee + tax - cappedDiscount)
    );
    setComputedTotal(newTotal);
  }, [applied, appliedDiscount, subtotal, deliveryFee, tax]);

  const handleApply = async () => {
    setApplyError(null);
    const trimmed = code.trim();
    if (!trimmed) {
      setApplyError("Please enter a code.");
      return;
    }

    onApply?.(trimmed);

    setApplying(true);
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: trimmed }),
      });

      const data: {
        valid: boolean;
        reason?: string;
        discount?: number;
      } = await res.json();

      if (!res.ok) {
        setApplyError(data?.reason || "Failed to apply coupon.");
        setApplying(false);
        return;
      }
      if (!data.valid) {
        setApplyError(data?.reason || "Coupon is not valid.");
        setApplying(false);
        return;
      }

      const newDiscount = Math.max(0, Math.floor(data.discount ?? 0));
      const cappedDiscount = Math.min(newDiscount, Math.max(0, Math.floor(subtotal)));
      const newTotal = Math.max(
        0,
        Math.floor(subtotal + deliveryFee + tax - cappedDiscount)
      );

      setApplied(true);
      setAppliedDiscount(newDiscount);
      setComputedTotal(newTotal);
      setApplying(false);
    } catch {
      setApplyError("Network error. Please try again.");
      setApplying(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setConfirming(true);
      onConfirm?.();

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          subtotal,
          delivery_fee: deliveryFee,
          coupon_code: code.trim().toUpperCase() || undefined,
          tax,
          coupon: applied ? appliedDiscount : coupon,
          total: computedTotal,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to create order");
        return;
      }

      const orderId = data.order?.id;
      if (orderId) {
        router.push(`/deliverydetail?orderId=${orderId}`);
      } else {
        alert("Order created, but ID not found.");
      }
    } catch (err) {
      console.error(err);
      alert("Error confirming order.");
    } finally {
      setConfirming(false);
    }
  };

  const displayCoupon = applied
    ? Math.min(
      Math.max(0, Math.floor(appliedDiscount)),
      Math.max(0, Math.floor(subtotal))
    )
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
          onClick={handleApply}
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
          onClick={handleConfirm}
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
