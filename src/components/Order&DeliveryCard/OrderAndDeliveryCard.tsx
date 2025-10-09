"use client";

import React from "react";
import OrderDetails from "../OrderDetails";

export default function OrderAndDeliveryCard() {
  return (
    <div className="rounded-xl border border-[#E4E4E4] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <OrderDetails />
        <div className="p-5 md:p-6 lg:p-7"> {/* replace with your DeliveryDetails */}
          {/* DeliveryDetails goes here */}
        </div>
      </div>
    </div>
  );
}
