"use client";

import React from "react";
import OrderDetails from "../OrderDetails";

export default function OrderAndDeliveryCard() {
  return (
    <div className="rounded-xl border border-[#E4E4E4] bg-white">
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <OrderDetails />

        {/* Middle Dotted Line (desktop only) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-[#DADADA]" />

        {/* Right Section */}
        <div className="p-5 md:p-6 lg:p-7">
          {/* DeliveryDetails goes here */}
        </div>
      </div>
    </div>
  );
}

