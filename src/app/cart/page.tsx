"use client";

import React from "react";
import CartScreen from "@/components/CartScreen";

import DeliveryOption from "@/components/DeliveryOption";
import RecommendedMenu from "@/components/RecommendedMenu";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FFFAEC] px-4 py-12 md:px-16 md:py-24">
      <div className="mx-auto w-full space-y-12 md:space-y-24">
        
        <CartScreen />
        <RecommendedMenu />
        <DeliveryOption />
        
      </div>
    </div>


  );
}
