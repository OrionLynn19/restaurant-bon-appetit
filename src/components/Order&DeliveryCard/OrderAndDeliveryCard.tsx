// src/components/Order&DeliveryCard/OrderAndDeliveryCard.tsx
"use client";

import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";
import OrderDetails from "../OrderDetails";
import DeliveryDetails from "../DeliveryDetails";

type Props = {
  /** Provided by /deliverydetail?page?orderId=... */
  orderId?: string;
};

export default function OrderAndDeliveryCard({ orderId }: Props) {
  // Summary date/time shown on the right
  const [orderDate, setOrderDate] = React.useState<string>("");
  const [orderTime, setOrderTime] = React.useState<string>("");

  // OrderDetails will call this with order.created_at (ISO)
  const handleMeta = (createdAtISO: string) => {
    if (!createdAtISO) return;
    const d = new Date(createdAtISO);
    setOrderDate(
      d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    );
    setOrderTime(
      d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="w-full bg-[#FFF5E2] py-6 md:py-8">
      <div className="mx-4 md:mx-12 lg:mx-16">
        <div className="rounded-2xl border border-[#E4E4E4] bg-white shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* DELIVERY (right on desktop, first on mobile) */}
            <div className="order-1 md:order-2 p-5 md:p-7 border-b md:border-b-0 md:border-l border-[#E4E4E4]">
              <div className="flex justify-between items-center mb-4 md:mb-5">
                <h2 className="text-[20px] md:text-[40px] tracking-wide font-bebas text-[#0F3B2F] uppercase">
                  Delivery Details
                </h2>
                <div className="flex items-center gap-3 text-[#0F3B2F] text-lg">
                  <FaPhoneAlt className="cursor-pointer" />
                  <BsChatRightDotsFill className="cursor-pointer" />
                </div>
              </div>

              <DeliveryDetails />

              {/* SUMMARY */}
              <div className="mt-6">
                <h3 className="text-[16px] font-extrabold uppercase mb-2 text-[#0F3B2F]">
                  Summary
                </h3>
                <p className="text-[#0F3B2F]">Order Id : {orderId || "—"}</p>
                <p className="text-[#0F3B2F]">Order Date : {orderDate || "—"}</p>
                <p className="text-[#0F3B2F]">Order Time : {orderTime || "—"}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-[16px] font-extrabold uppercase mb-2 text-[#0F3B2F]">
                  Location
                </h3>
                <p className="text-[#0F3B2F]">
                  12, Watt Street, Bangkok, Thailand, 12, Watt Street, Bangkok, Thailand 12, Watt
                  Street, Bangkok, Thailand
                </p>
              </div>
            </div>

            {/* ORDER DETAILS (left on desktop) */}
            <div className="order-2 md:order-1 p-5 md:p-7 border-b md:border-b-0 md:border-r border-[#E4E4E4]">
              {/* ⬇️ pass orderId and onMeta so it fetches and sets date/time */}
              <OrderDetails orderId={orderId} onMeta={handleMeta} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
