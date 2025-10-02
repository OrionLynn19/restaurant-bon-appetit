import React from "react";

const categories = [
  "Special Promotions",
  "European Cuisine",
  "Dessert & Drinks",
  "Salad",
];

interface MenuCategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function MenuCategoryBar({
  selectedCategory,
  onSelectCategory,
}: MenuCategoryBarProps) {
  return (
    <nav className="w-full overflow-x-auto scrollbar-hide">
      <ul className="flex gap-6 md:gap-[80px] whitespace-nowrap md:w-[791px] md:h-[25px] scrollbar-hide">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`h-[35px] flex items-center justify-center font-schibsted font-semibold text-[12px] leading-[1] tracking-[0] border-b-0 md:h-[25px] md:text-[20px] md:font-normal md:tracking-[0] transition-colors px-[5px] py-[10px] md:px-0 cursor-pointer ${
              selectedCategory === cat
                ? "text-[#073027] border-b-[1.5px] border-[#0a5c4a]"
                : "text-[#073027] hover:text-[#000] border-b-0"
            }`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </nav>
  );
}
