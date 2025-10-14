"use client";
import { useState, useEffect } from "react";
import { menuApi, categoriesApi } from "@/lib/api";
import type { MenuItem, Category } from "@/types/content";
import MenuCategoryBar from "./MenuCategoryBar";
import OurMenuCard from "./Card/OurMenuCard";

export default function DiscoverOurMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoriesApi.getAll();
      if (response.success && response.data) {
        setCategories(response.data);
        // Auto-select first category if none selected
        if (!selectedCategory) {
          setSelectedCategory(response.data[0]?.name || "");
        }
      }
    };
    fetchCategories();
  }, []);

  // Fetch menu items when category changes
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!selectedCategory) return;

      setLoading(true);
      setError(null);

      try {
        const categoryId = categories.find(
          (cat) => cat.name === selectedCategory
        )?.id;

        const filters = {
          available: true,
          sort: "name" as const,
          order: "asc" as const,
          category_id: categoryId,
        };

        const response = await menuApi.getAll(filters);

        if (response.success && response.data) {
          setMenuItems(response.data);
        } else {
          setError(response.error || "Failed to load menu items");
          setMenuItems([]);
        }
      } catch (err) {
        setError("Failed to load menu items");
        setMenuItems([]);
      }

      setLoading(false);
    };

    if (selectedCategory && categories.length > 0) {
      fetchMenuItems();
    }
  }, [selectedCategory, categories]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-[375px] mx-auto flex justify-center items-center py-16 md:max-w-[1440px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-[375px] mx-auto flex justify-center items-center py-16 md:max-w-[1440px]">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <p className="text-lg font-semibold">Oops! Something went wrong</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="discover-our-menu"
      className="w-full max-w-[375px] mx-auto flex flex-col gap-8 md:max-w-[1440px] md:mx-auto md:gap-12 md:items-center"
    >
      <div className="w-[375px] h-[82px] flex flex-col gap-8 justify-center md:w-full md:h-auto md:gap-12 md:items-center">
        <div className="w-[375px] h-[35px] flex items-center border-b border-[#696969] md:border-b-0 md:border-none px-4 md:w-full md:max-w-[791px] md:h-[25px] md:mx-auto md:px-0 md:gap-[80px]">
          <MenuCategoryBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-[16px] md:gap-x-[24px] gap-y-[16px] md:gap-y-[24px] justify-center px-[25.5px] md:px-4 md:w-full md:max-w-[1312px] md:mx-auto md:justify-between xl:px-0">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <OurMenuCard
              key={item.id}
              image={item.image_url || "/images/placeholder-food.jpg"}
              name={item.name}
              originalPrice={
                item.discount_price ? `${item.price} THB` : undefined
              }
              price={
                item.discount_price
                  ? `${item.discount_price} THB`
                  : `${item.price} THB`
              }
              description={item.description || ""}
              specialPromotion={!!item.discount_price}
            />
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500 py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">🍽️</div>
              <div>
                <p className="text-lg font-semibold">No items Kha</p>
                <p className="text-sm">Check back later for new menu items</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
