// hooks/useOrder.ts
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UseOrderParams = {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  coupon: number;
  total: number;
};

export function useOrder({ subtotal, deliveryFee, tax, coupon, total }: UseOrderParams) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  const [applied, setApplied] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [computedTotal, setComputedTotal] = useState<number>(total);

  const [confirming, setConfirming] = useState(false);

  // keep computed total in sync with upstream total when no coupon applied
  useEffect(() => {
    if (!applied) setComputedTotal(total);
  }, [total, applied]);

  // recompute when coupon applied or components of price change
  useEffect(() => {
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

  // call /api/coupon/validate (same logic as earlier)
  const applyCoupon = async (incomingCode: string) => {
    setApplyError(null);
    const trimmed = incomingCode.trim();
    if (!trimmed) {
      setApplyError("Please enter a code.");
      return;
    }

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
      setCode(trimmed);
    } catch (e) {
      setApplyError("Network error. Please try again.");
      setApplying(false);
    }
  };

  // create order and redirect
  const handleConfirm = async () => {
    setConfirming(true);
    try {
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
        alert(data?.error || "Failed to create order");
        return;
      }

      const orderId = data?.order?.id;
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

  return {
    // coupon state + actions
    code,
    setCode,
    applying,
    applyError,
    applyCoupon,
    applied,
    appliedDiscount,
    computedTotal,

    // confirmation
    confirming,
    handleConfirm,
  } as const;
}
