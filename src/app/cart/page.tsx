"use client";
import React from "react";
import CartScreen from "@/components/CartScreen";
import DeliForm, { DeliverySpot } from "@/components/DeliForm";

export default function CartPage() {
  const [address, setAddress] = React.useState("Angel Home Apartment, LakHok...");
  const [spot, setSpot] = React.useState<DeliverySpot>("Place At Given Spot");

  return (
    <div className="min-h-screen bg-[#FFFAEC] p-6">
      <CartScreen />

      <div className="mt-8">
        <DeliForm
          address={address}
          onAddressChange={setAddress}
          spot={spot}
          onSpotChange={setSpot}
        />
      </div>
    </div>
  );
}
