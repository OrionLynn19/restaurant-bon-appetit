"use client"; 
import React from "react";
import Image from "next/image";

interface ConfirmBoxProps {
  fullName: string;
  phoneNumber: string;
  date: string;
  time: string;
  branch: string;
  guests: number;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function confirmBox({
  fullName,
  phoneNumber,
  date,
  time,
  branch,
  guests,
  message,
  onConfirm,
  onCancel,
}: ConfirmBoxProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="
          rounded-lg shadow-lg  text-center
          bg-[rgba(255,254,250,1)]
          w-[343px] h-[327px]   
          md:w-[646px] md:h-[682px] 
        "
        style={{
          fontFamily: 'var(--font-bebas), Bebas Neue, Arial, Helvetica, sans-serif'
        }}
      >
       
        <div className="flex justify-center mb-[9px] md:mb-[3px] mt-[9px] md:mt-[28px]">
          <Image
            src="/images/logo_bonappeti.png"
            alt="Restaurant Logo"
            width={40}
            height={40}
            className="object-contain w-[40px] h-[40px] md:w-[64px] md:h-[64px]"
          />
        </div>
        
        <div className="flex justify-center mb-[21px]">
          <div 
            className="text-[rgba(7,48,39,1)] w-[180px] h-[17px] md:w-[180px] md:h-[28px] flex items-center justify-center text-[24px] md:text-[40px] md:mb-[32px]"
          >
            Bon AppÉtit
          </div>
        </div>

        
        <div 
          className="text-[rgba(7, 48, 39, 1)] text-left ml-[24px] md:ml-[133px] mb-[12px] md:mb-[32px] space-y-1 md:space-y-[12px]"
        >
          <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">FULL NAME</span> 
            <span className="ml-[163px] md:ml-[400px]">{fullName}</span>
          </p>
          <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">PHONE NUMBER</span> 
            <span className="ml-[163px] md:ml-[400px]">{phoneNumber}</span>
          </p>
          <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">DATE</span> 
            <span className="ml-[163px] md:ml-[400px]">{date}</span>
          </p>
          <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">TIME</span> 
            <span className="ml-[163px] md:ml-[400px]">{time}</span>
          </p>
          <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px] md:pr-0">
            <span className="font-medium whitespace-nowrap">RESTAURANT BRANCH</span> 
            <span className="ml-[163px] md:ml-[400px]">{branch}</span>
          </p>
          <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">AMOUNT OF GUEST</span> 
            <span className="ml-[163px] md:ml-[400px]">{guests}</span>
          </p>
          
            <p className="md:h-[40px] md:flex md:items-center text-[15px] md:text-[20px]">
              <span className="font-medium">MESSAGE</span> 
              <span className="ml-[163px] md:ml-[400px]">{message}</span>
            </p>
          
        </div>

      
        <div className="flex justify-between mt-[0px] mb-[22px] mx-[24px] md:mx-[133px]">
          <button
            onClick={onCancel}
            className="flex items-center justify-center
                          min-w-[57px] h-[26px]  text-[14px]
                          md:min-w-[109px] md:h-[47px] md:text-[22px]
                          rounded-[8px] bg-[#EF9748] border-2 border-[#073027] text-[#073027] font-['Bebas_Neue'] font-extrabold
                          shadow-[0_2px_0_0_#073027] md:shadow-[0_5px_0_0_#073027]
                          hover:translate-y-[1px] hover:shadow-[0_4px_0_0_#073027] hover:bg-[#FAB170] transition-transform duration-150
                          active:translate-y-[3px] active:shadow-[0_3px_0_0_#073027] "
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center
                          min-w-[57px] h-[26px]  text-[14px]
                          md:min-w-[109px] md:h-[47px]  md:text-[22px]
                          rounded-[8px] bg-[#EF9748] border-2 border-[#073027] text-[#073027] font-['Bebas_Neue'] font-extrabold
                          shadow-[0_2px_0_0_#073027] md:shadow-[0_5px_0_0_#073027]
                          hover:translate-y-[1px] hover:shadow-[0_4px_0_0_#073027] hover:bg-[#FAB170] transition-transform duration-150
                          active:translate-y-[3px] active:shadow-[0_3px_0_0_#073027] "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
