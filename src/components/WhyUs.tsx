"use client";

import React from "react";
import { whyUsData } from "@/data/whyUs";
import Image from "next/image";

const WhyUs: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFCF1] py-12 lg:py-24 lg:px-16.25">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="w-full max-w-[600px] min-w-[375px] min-h-[754px] mx-auto">
          <div className="w-[calc(100%-20px)] max-w-[580px] min-w-[344px] min-h-[734px] flex flex-col gap-8 mx-auto">
            <h2 className="w-full font-['Bebas_Neue'] font-normal text-2xl leading-none tracking-normal text-center capitalize m-0 text-[#073027]">
              Why Dine With Us ?
            </h2>

            <div className="w-full h-auto aspect-[344/190]">
              <Image
                src="/images/whydinewithusmobile.png"
                alt="Restaurant dining experience"
                className="w-full h-full rounded-lg object-cover"
                layout="responsive"
                width={344}
                height={190}
              />
            </div>

            <div className="w-full flex flex-col gap-8">
              {whyUsData.map((item) => (
                <div key={item.id} className="w-full px-2">
                  <h3 className="font-['Bebas_Neue'] font-normal mb-3 text-[#073027] text-[20px]">
                    {item.title}
                  </h3>
                  <p className="font-['Schibsted_Grotesk'] font-normal text-sm leading-relaxed text-black m-0">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Image Container with Complex Layout */}
          <div
            className="relative w-full max-w-[1310px] h-auto mx-auto"
            style={{ aspectRatio: "1310/1045" }}
          >
            {/* Section Title */}
            <div className="w-full flex justify-center">
              <h2 className="w-[243px] h-[28px] font-['Bebas_Neue'] font-normal text-[40px] leading-none text-center capitalize text-[#073027]">
                Why dine with us ?
              </h2>
            </div>
            {/* First Content Container - Top Left */}
            <div className="absolute top-[14.35%] left-0 w-[40.69%] h-[17.7%] flex flex-col gap-6">
              <h3 className="w-full font-['Bebas_Neue'] font-normal text-[2.44vw] xl:text-[32px] leading-none text-left capitalize text-[#073027]">
                {whyUsData[0]?.title}
              </h3>
              <p className="w-full font-['Schibsted_Grotesk'] font-normal text-[1.53vw] xl:text-[20px] leading-none text-left capitalize text-black">
                {whyUsData[0]?.description}
              </p>
            </div>

            {/* Second Content Container - Middle Right */}
            <div className="absolute top-[46.32%] left-[32.02%] w-[35.8%] h-[24.88%] flex flex-col gap-6">
              <h3 className="w-full font-['Bebas_Neue'] font-normal text-[2.44vw] xl:text-[32px] leading-none text-center capitalize text-[#073027]">
                {whyUsData[1]?.title}
              </h3>
              <p className="w-full font-['Schibsted_Grotesk'] font-normal text-[1.53vw] xl:text-[20px] leading-none text-center capitalize text-black">
                {whyUsData[1]?.description}
              </p>
            </div>

            {/* Third Content Container - Bottom Right */}
            <div className="absolute top-[80.67%] left-[59.31%] w-[40.69%] h-[17.7%] flex flex-col gap-6">
              <h3 className="w-full font-['Bebas_Neue'] font-normal text-[2.44vw] xl:text-[32px] leading-none text-right capitalize text-[#073027]">
                {whyUsData[2]?.title}
              </h3>
              <p className="w-full font-['Schibsted_Grotesk'] font-normal text-[1.53vw] xl:text-[20px] leading-none text-right capitalize text-black">
                {whyUsData[2]?.description}
              </p>
            </div>

            {/* First Desktop Image - Bottom Left */}
            <div className="absolute top-[38.56%] left-0 w-[49%] h-[61.44%]">
              <Image
                src="/images/whydinewithusdesktop1.png"
                alt="Restaurant dining experience"
                className="w-full h-full rounded-lg object-cover"
                width={642}
                height={642}
              />
            </div>

            {/* Second Desktop Image - Top Right */}
            <div className="absolute top-[10.81%] left-[51%] w-[49%] h-[61.44%]">
              <Image
                src="/images/whydinewithusdesktop2.png"
                alt="Restaurant dining experience"
                className="w-full h-full rounded-lg object-cover"
                width={642}
                height={642}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
