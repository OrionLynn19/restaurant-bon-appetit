import React, { useState } from "react";
import MenuCategoryBar from "./MenuCategoryBar";
import OurMenuCard from "./Card/OurMenuCard";
import { ourMenuItems } from "../data/ourMenu";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] =
    useState("Special Promotions");

  const filteredMenu = ourMenuItems.filter(
    (item) => item.categories && item.categories.includes(selectedCategory)
  );
  return (
    <div className="w-full max-w-[375px] mx-auto flex flex-col gap-8 md:max-w-[1440px] md:mx-auto md:gap-12 md:items-center">
      {/* Section 1: Title & Category Bar */}
      <div className="w-[375px] h-[82px] flex flex-col gap-8 justify-center md:w-full md:h-auto md:gap-12 md:items-center">
        <h2 className="w-[375px] h-[15px] text-center font-bebas text-[22px] text-[#073027] tracking-[0px] md:w-full md:h-[22px] md:text-[32px] md:capitalize font-normal leading-[1] md:text-center">
          DISCOVER OUR MENU
        </h2>
        <div className="w-[375px] h-[35px] flex items-center border-b border-[#696969] md:border-b-0 md:border-none px-4 md:w-full md:max-w-[791px] md:h-[25px] md:mx-auto md:px-0 md:gap-[80px]">
          <MenuCategoryBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
      {/* Section 2: Menu Cards */}
      <div className="grid grid-cols-2 gap-x-[16px] md:gap-x-[24px] gap-y-[16px] md:gap-y-[24px] justify-center px-[25.5px] md:px-4 md:w-full md:max-w-[1312px] md:mx-auto md:justify-between xl:px-0">
        {filteredMenu.map((item, idx) => (
          <OurMenuCard
            key={idx}
            image={item.image}
            name={item.name}
            originalPrice={item.originalPrice}
            price={item.price}
            description={item.description}
            specialPromotion={item.specialPromotion}
          />
        ))}
      </div>
    </div>
  );
}
