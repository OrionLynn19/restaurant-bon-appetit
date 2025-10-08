"use client";
import React from "react";
import CartScreen from "@/components/CartScreen";
import DeliveryOption from "@/components/DeliveryOption";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FFFAEC]">
      <div className="mx-auto w-full space-y-12 gap-[48px] md:gap-[96px] px-4 py-12 md:px-16 md:py-24">
        <CartScreen />
        <DeliveryOption />
      </div>
    </div>
  );
}
