"use client";
import React from "react";
import CartScreen from "@/components/CartScreen";
import DeliForm, { DeliverySpot, Mode } from "@/components/DeliForm";

export default function CartPage() {
  const [mode, setMode] = React.useState<Mode>("delivery");
  const [address, setAddress] = React.useState("Angel Home Apartment, LakHok...");
  const [spot, setSpot] = React.useState<DeliverySpot>("Place At Given Spot");

  return (
    <div className="min-h-screen bg-[#FFFAEC] px-6 py-10">
      <div className="mx-auto w-full max-w-[1120px] space-y-12">
        <CartScreen />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[560px_1fr]">
          <DeliForm
            mode={mode}
            address={address}
            onAddressChange={setAddress}
            spot={spot}
            onSpotChange={setSpot}
            className="w-full max-w-[560px]"
          />
          <div />
        </div>
      </div>
    </div>
  );
}
