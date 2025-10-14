"use client";
import React from "react";
import DeliForm, { DeliverySpot, Mode } from "./DeliForm";
import PaymentSection from "@/components/PaymentSection";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "../context/CartContext";

export default function DeliveryOption({
  className = "",
}: {
  className?: string;
}) {
  const { subtotal, deliveryFee, tax, coupon, total } = useCart();
  const [mode, setMode] = React.useState<Mode>("delivery");
  const [address, setAddress] = React.useState<string>(
    "Angel Home Apartment, LakHok..."
  );
  const [spot, setSpot] = React.useState<DeliverySpot>("Place At Given Spot");

  return (
    <section className={`w-full max-w-[1312px]${className}`}>
      <div className="w-full mx-auto space-y-8 md:space-y-[48px]">
        <div className="h-[40px] flex justify-center items-center">
          <div className="flex items-center gap-6 md:gap-6">
            <button
              type="button"
              onClick={() => setMode("delivery")}
              aria-pressed={mode === "delivery"}
              className={`
                font-['Bebas_Neue'] font-normal capitalize leading-none text-[20px] md:text-[40px] px-1 py-2 md:py-2 transition-colors cursor-pointer
                ${
                  mode === "delivery"
                    ? "text-[#073027] border-b border-[#073027]"
                    : "text-[#073027] border-b border-transparent"
                }
              `}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setMode("pickngo")}
              aria-pressed={mode === "pickngo"}
              className={`
                font-['Bebas_Neue'] font-normal capitalize leading-none
                text-[20px] md:text-[40px]
                px-1 py-2 md:py-2
                transition-colors cursor-pointer
                ${
                  mode === "pickngo"
                    ? "text-[#073027] border-b border-[#073027]"
                    : "text-[#073027] border-b border-transparent"
                }
              `}
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
            {/* Payment */}
            <div className="hidden md:block">
              <h3 className="mb-6 text-[20px] md:text-[32px] font-normal text-[#073027] font-['Bebas_Neue']">
                Payment
              </h3>
              <PaymentSection noPadding />
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="w-full">
            <h3 className="mb-6 text-[20px] md:text-[32px] font-normal text-[#073027] font-['Bebas_Neue']">
              Order Summary
            </h3>
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              coupon={coupon}
              total={total}
              hideConfirmOnMobile
              onApply={(code) => console.log("Apply code:", code)}
              onConfirm={() => console.log("Confirm order")}
            />
          </div>

          {/* Payment section - only visible on mobile */}
          <div className="block md:hidden">
            <h3 className="mb-6 text-[20px] md:text-[32px] font-normal text-[#073027] font-['Bebas_Neue']">
              Payment
            </h3>
            <PaymentSection noPadding />
          </div>
          {/* Mobile confirm button under Payment */}
          <div className="block md:hidden mt-4">
            <div className="px-0">
              <button
                onClick={() => console.log("Confirm order")}
                className="w-full bg-[#EF9748] shadow-[0_3px_0_0_#073027] rounded-[8px] border-2 border-[#073027] px-5 py-1  hover:bg-[#FAB170] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027] active:bg-[#d46a1f] active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
                  transition-transform duration-150"
              >
                CONFIRM ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
