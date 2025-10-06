"use client"; 
import  { useState } from "react";
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
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);
  const [isNameExpanded, setIsNameExpanded] = useState(false);

  return (
    <div className="min-w-[343px] min-h-[327px] fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="
          rounded-lg shadow-lg text-center
          bg-[rgba(255,254,250,1)]
          w-[343px] min-h-[327px] h-auto
          md:w-[646px] md:min-h-[682px] md:h-auto
          max-h-[90vh] overflow-y-auto
          py-4 md:py-6
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
          className="text-[rgba(7, 48, 39, 1)] text-left mb-[12px] md:mb-[32px] space-y-1 md:space-y-[12px] px-[24px] md:px-[133px] flex-grow"
        >
          <div className="flex flex-row md:h-[40px] md:items-center items-center text-[15px] md:text-[18px]">
            <div className="font-normal whitespace-nowrap">FULL NAME</div> 
            <div 
              className={`ml-29 max-w-[140px] md:max-w-[220px] font-normal md:ml-54 cursor-pointer ${
                isNameExpanded 
                  ? 'break-words text-[10px] md:text-[12px]' 
                  : 'truncate text-[12px] md:text-[15px]'
              }`}
              style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}
              onClick={() => setIsNameExpanded(!isNameExpanded)}
              title={isNameExpanded ? "Click to collapse" : "Click to expand"}
            >
              {fullName}
            </div>
          </div>
          <div className="md:h-[40px] md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium truncate">PHONE NUMBER</span> 
            <span className="text-[12px] md:text-[15px] max-w-[140px] md:max-w-[200px] font-normal ml-24 md:ml-45.5" style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}>{phoneNumber}</span>
          </div>
          <div className="md:h-[40px] md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">DATE</span> 
            <span className="text-[12px] md:text-[15px] max-w-[140px] md:max-w-[200px] font-normal ml-36 md:ml-62" style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}>{date}</span>
          </div>
          <div className="md:h-[40px] md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">TIME</span> 
            <span className=" text-[12px] md:text-[15px] max-w-[140px] md:max-w-[200px] font-normal ml-36 md:ml-62.5" style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}>{time}</span>
          </div>
          <div className="md:h-[40px] md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium whitespace-nowrap">RESTAURANT BRANCH</span> 
            <span className=" text-[12px] md:text-[15px] max-w-[140px] md:max-w-[200px] font-normal ml-17.5 md:ml-37.5" style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}>{branch}</span>
          </div>
          <div className="md:h-[40px] md:items-center text-[15px] md:text-[20px]">
            <span className="font-medium">AMOUNT OF GUEST</span> 
            <span className="text-[12px] md:text-[15px] max-w-[140px] md:max-w-[200px] font-normal md:ml-42.5 ml-21" style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}>{guests}</span>
          </div>
          <div className=" flex flex-row md:flex md:flex-row md:h-[40px] md:items-center text-[15px] md:text-[20px]">
            <div className="font-medium ">MESSAGE</div> 
            <div 
              className={`ml-31 max-w-[140px] md:max-w-[200px] font-normal md:ml-56 cursor-pointer ${
                isMessageExpanded 
                  ? 'break-words text-[8px] md:text-[12px]' 
                  : 'truncate text-[12px] md:text-[20px]'
              }`}
              style={{ fontFamily: 'Schibsted Grotesk, sans-serif' }}
              onClick={() => setIsMessageExpanded(!isMessageExpanded)}
              title={isMessageExpanded ? "Click to collapse" : "Click to expand"}
            >
              {message}
            </div>
          </div>
        </div>

      
        <div className="flex justify-between mt-auto mb-[22px] mx-[24px] md:mx-[133px]">
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
