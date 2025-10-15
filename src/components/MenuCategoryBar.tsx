"use client";
import React, { useState, useEffect } from "react";
import { categoriesApi } from "@/lib/api";
import type { Category } from "@/types/content";

export interface MenuCategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const MenuCategoryBar: React.FC<MenuCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await categoriesApi.getAll();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          setError(response.error || "Failed to load categories");
          setCategories([]);
        }
      } catch {
        setError("Failed to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      onSelectCategory(categories[0].name);
    }
  }, [categories, selectedCategory, onSelectCategory]);

  if (loading) {
    return (
      <nav className="w-full overflow-x-auto scrollbar-hide">
        <ul className="flex gap-6 md:gap-[80px] whitespace-nowrap md:w-[791px] md:h-[25px] scrollbar-hide">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="h-[35px] flex items-center justify-center md:h-[25px] animate-pulse">
              <div className="bg-gray-300 rounded h-4 w-20" />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  if (error || categories.length === 0) {
    return (
      <nav className="w-full overflow-x-auto scrollbar-hide">
        <ul className="flex gap-6 md:gap-[80px] whitespace-nowrap">
          <li className="text-red-500 text-sm">{error || "No categories found"}</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="w-full overflow-x-auto scrollbar-hide">
      <ul className="flex gap-6 md:gap-[80px] whitespace-nowrap md:w-[791px] md:h-[25px] scrollbar-hide">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`h-[35px] flex items-center justify-center font-schibsted font-semibold text-[12px] leading-[1] tracking-[0] border-b-0 md:h-[25px] md:text-[20px] md:font-normal md:tracking-[0] transition-colors px-[5px] py-[10px] md:px-0 cursor-pointer ${
              selectedCategory === category.name
                ? "text-[#073027] border-b-[1.5px] border-[#0a5c4a]"
                : "text-[#073027] hover:text-[#000] border-b-0"
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuCategoryBar;
