"use client";

import React from "react";
import { FaPhoneAlt, FaHome, FaRegCircle } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";

export default function OrderAndDeliveryCard() {
  return (
    <div className="rounded-xl border border-[#E4E4E4] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <div className="p-5 md:p-6 lg:p-7">
          {/* OrderDetails goes here */}
          
        </div>

        {/* ---------------- RIGHT SIDE: DELIVERY DETAILS ---------------- */}
        <div className="p-5 md:p-6 lg:p-7">
          {/* ✅ Delivery Details Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[18px] font-extrabold tracking-wider text-[#0F3B2F] uppercase">
              Delivery Details
            </h2>
            <div className="flex items-center gap-3 text-[#0F3B2F] text-lg">
              <FaPhoneAlt className="cursor-pointer" />
              <BsChatRightDotsFill className="cursor-pointer" />
            </div>
          </div>

          {/* ✅ Delivery Info Content */}
          <div className="space-y-6 text-sm text-[#0F3B2F]">
            {/* From Section */}
            <div className="flex gap-4">
              <FaRegCircle size={12} className="mt-1 min-w-[12px]" />
              <div>
                <p className="font-semibold">From</p>
                <p>Bon Appétit Silom</p>
              </div>
            </div>

            {/* Dotted line connection */}
            <div className="border-l-2 border-dashed border-[#E4E4E4] ml-[6px] h-5"></div>

            {/* Delivering To Section */}
            <div className="flex gap-4">
              <FaHome size={18} className="mt-1" />
              <div>
                <p className="font-semibold">Delivering To</p>
                <p>Home</p>
                <p className="text-xs mt-1">* Next To North Building.....</p>
              </div>
            </div>

            {/* Summary Section */}
            <div className="pt-4">
              <h3 className="text-[16px] font-extrabold tracking-wider uppercase mb-2">
                Summary
              </h3>
              <p>Order Id : 334789</p>
              <p>Order Date : 20th August</p>
              <p>Order Time : 11:00 AM</p>
            </div>

            {/* Location Section */}
            <div className="pt-4">
              <h3 className="text-[16px] font-extrabold tracking-wider uppercase mb-2">
                Location
              </h3>
              <p>
                12, Watt Street, Bangkok, Thailand, 12, Watt Street, Bangkok,
                Thailand 12, Watt Street, Bangkok, Thailand
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
