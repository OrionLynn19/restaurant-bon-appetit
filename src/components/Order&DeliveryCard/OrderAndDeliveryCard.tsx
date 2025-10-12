"use client";

import React from "react";
import { FaPhoneAlt, FaHome, FaRegCircle } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";

export default function OrderAndDeliveryCard() {
  return (
    
    <div className="w-full bg-[#FFFCF1] py-8">
      
      <div className="ml-5 md:ml-12 lg:ml-16 mr-4">
       
        <div className="rounded-2xl border border-[#E4E4E4] bg-white shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
           
            <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#E4E4E4]">
              <p className="text-gray-400 italic">Order details will be here...</p>
            </div>

         
            <div className="p-6 md:p-7">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[18px] font-extrabold tracking-wide text-[#0F3B2F] uppercase">
                  Delivery Details
                </h2>
                <div className="flex items-center gap-3 text-[#0F3B2F] text-lg">
                  <FaPhoneAlt className="cursor-pointer" />
                  <BsChatRightDotsFill className="cursor-pointer" />
                </div>
              </div>

      
              <div className="space-y-6 text-sm text-[#0F3B2F]">
               
                <div className="flex gap-4">
                  <FaRegCircle size={12} className="mt-1 min-w-[12px]" />
                  <div>
                    <p className="font-semibold">From</p>
                    <p>Bon Appétit Silom</p>
                  </div>
                </div>

                <div
                  className="ml-[6px] h-6 border-l-2 border-dashed"
                  style={{ borderColor: "#EF9748" }}
                />

                
                <div className="flex gap-4">
                  <FaHome size={18} className="mt-1" />
                  <div>
                    <p className="font-semibold">Delivering To</p>
                    <p>Home</p>
                    <p className="text-xs mt-1">* Next To North Building.....</p>
                  </div>
                </div>

                
                <div className="pt-4">
                  <h3 className="text-[16px] font-extrabold uppercase mb-2">Summary</h3>
                  <p>Order Id : 334789</p>
                  <p>Order Date : 20th August</p>
                  <p>Order Time : 11:00 AM</p>
                </div>

                
                <div className="pt-4">
                  <h3 className="text-[16px] font-extrabold uppercase mb-2">Location</h3>
                  <p>
                    12, Watt Street, Bangkok, Thailand, 12, Watt Street, Bangkok,
                    Thailand 12, Watt Street, Bangkok, Thailand
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
