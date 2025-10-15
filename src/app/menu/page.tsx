"use client";
import MenuPageSlider from "@/components/slider-menu-page";
import CartButton from "@/components/CartButton";
import DiscoverOurMenu from "@/components/DiscoverOurMenu";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function Menu() {
  const categories = useMemo(
    () => [
      "Special Promotions",
      "European Cuisine",
      "Dessert & Drinks",
      "Salad",
    ],
    []
  );

  function slugify(cat: string) {
    return cat
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  // Sync with hash on load and hash change
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#", "");
      const match = categories.find((cat: string) => slugify(cat) === hash);
      if (match) setSelectedCategory(match);
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [categories]);

  // Add this useEffect to listen for category changes:
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail.categoryName);
    };

    window.addEventListener('categoryChange', handleCategoryChange as EventListener);
    
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
    };
  }, []);

  // When tab is clicked, update hash
  const handleTabClick = useCallback((cat: string) => {
    setSelectedCategory(cat);
    window.location.hash = slugify(cat);
  }, []);

  return (
    <>
      <div>
        <div className="mt-15"></div>
        <MenuPageSlider />
        <div className="md:mb-20 mb-15"></div>
        
        <DiscoverOurMenu 
          selectedCategory={selectedCategory}
          onSelectCategory={handleTabClick}
        />
        
        <div className="md:mb-25 mb-15"></div>
        <CartButton />
      </div>
    </>
  );
}
