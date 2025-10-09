"use client";
import React from "react";
import DeliForm, { DeliverySpot, Mode } from "./DeliForm";

export default function DeliveryOption({
  className = "",
}: {
  className?: string;
}) {
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

        <div className="grid grid-cols-1 gap-8 md:gap-[93px] md:grid-cols-2">
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
              <h3 className="mb-6 text-[20px] md:text-[32px] font-bold text-[#073027] font-['Bebas_Neue']">
                Payment
              </h3>
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="w-full">
            <h3 className="mb-6 text-[20px] md:text-[32px] font-bold text-[#073027] font-['Bebas_Neue']">
              Order Summary
            </h3>
          </div>

          {/* Payment section - only visible on mobile */}
          <div className="block md:hidden">
            <h3 className="mb-6 text-[20px] md:text-[32px] font-bold text-[#073027] font-['Bebas_Neue']">
              Payment
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
