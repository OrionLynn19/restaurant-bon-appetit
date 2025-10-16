"use client";
import React from "react";
import DeliForm, { DeliverySpot, Mode } from "./DeliForm";
import PaymentSection from "@/components/PaymentSection";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function DeliveryOption({
  className = "",
}: {
  className?: string;
}) {
  const { subtotal, deliveryFee, tax, coupon, total } = useCart();
  const router = useRouter();

  const [mode, setMode] = React.useState<Mode>("delivery");
  const [address, setAddress] = React.useState<string>(
    "Angel Home Apartment, LakHok..."
  );
  const [spot, setSpot] = React.useState<DeliverySpot>("Place At Given Spot");

  const [code, setCode] = React.useState("");
  const [applied, setApplied] = React.useState(false);
  const [appliedDiscount, setAppliedDiscount] = React.useState<number>(0);
  const [computedTotal, setComputedTotal] = React.useState<number>(total);
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

  const handleConfirm = async () => {
    try {
      setConfirming(true);

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

  return (
    <section className={`w-full max-w-[1312px] ${className}`}>
      <div className="w-full mx-auto space-y-8 md:space-y-[48px]">
        <div className="h-[40px] flex justify-center items-center">
          <div className="flex items-center gap-6 md:gap-6">
            <button
              type="button"
              onClick={() => setMode("delivery")}
              aria-pressed={mode === "delivery"}
              className={`font-['Bebas_Neue'] text-[20px] md:text-[40px] transition-colors cursor-pointer ${mode === "delivery"
                  ? "text-[#073027] border-b border-[#073027]"
                  : "text-[#073027] border-b border-transparent"
                }`}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setMode("pickngo")}
              aria-pressed={mode === "pickngo"}
              className={`font-['Bebas_Neue'] text-[20px] md:text-[40px] transition-colors cursor-pointer ${mode === "pickngo"
                  ? "text-[#073027] border-b border-[#073027]"
                  : "text-[#073027] border-b border-transparent"
                }`}
            >
              Pick & Go
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10.5 md:gap-[93px] md:grid-cols-2">
          <div className="space-y-8 md:space-y-[48px]">
            <DeliForm
              mode={mode}
              address={address}
              onAddressChange={setAddress}
              spot={spot}
              onSpotChange={setSpot}
              className="w-full"
            />
            <div className="hidden md:block">
              <h3 className="mb-6 text-[20px] md:text-[32px] text-[#073027] font-['Bebas_Neue']">
                Payment
              </h3>
              <PaymentSection noPadding />
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-6 text-[20px] md:text-[32px] text-[#073027] font-['Bebas_Neue']">
              Order Summary
            </h3>
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              coupon={coupon}
              total={total}
              hideConfirmOnMobile
              onApply={(code) => setCode(code)}
              onConfirm={handleConfirm}
            />
          </div>

          <div className="block md:hidden">
            <h3 className="mb-6 text-[20px] md:text-[32px] text-[#073027] font-['Bebas_Neue']">
              Payment
            </h3>
            <PaymentSection noPadding />
          </div>

          <div className="block md:hidden mt-4">
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="w-full bg-[#EF9748] shadow-[0_3px_0_0_#073027] rounded-[8px] border-2 border-[#073027] px-5 py-1  
                hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] 
                active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {confirming ? "PROCESSING..." : "CONFIRM ORDER"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
