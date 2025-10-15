
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { menuApi } from "@/lib/api";
import type { MenuItem } from "@/types/content";
import { useCart } from "@/context/CartContext";

export default function RecommendedMenu() {
  const { addItem } = useCart(); // <-- use cart
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add-to-cart from recommended list
  const handleAdd = (item: MenuItem) => {
    const unitPrice = item.discount_price ?? item.price ?? 0;
    const name = item.name || "Menu Item";
    const baseId = name.toLowerCase().replace(/\s+/g, "-"); // slug
    const image = item.image_url || "/images/placeholder-food.jpg";

    // No promo suffix here, so it stays separate from promo lines (which use __promo__)
    // If an identical recommended item is added again, qty will increase thanks to addItem merge logic
    addItem({
      id: baseId,
      name,
      price: unitPrice,
      qty: 1,
      image,
    });
  };

  // Fetch recommended menu items
  useEffect(() => {
    const fetchRecommendedItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await menuApi.getAll({
          available: true,
          sort: "name",
          order: "asc",
        });

        if (response.success && response.data) {
          const shuffled = [...response.data].sort(() => 0.5 - Math.random());
          setMenuItems(shuffled.slice(0, 4));
        } else {
          setError(response.error || "Failed to load recommended items");
          setMenuItems([]);
        }
      } catch {
        setError("Failed to load recommended items");
        setMenuItems([]);
      }

      setLoading(false);
    };

    fetchRecommendedItems();
  }, []);

  // Loading state
  if (loading) {
    return (
      <>
        {/* Desktop Loading */}
        <section className="hidden md:block" style={{ background: "#FFFCF1" }}>
          <h2 className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2">
            RECOMMEND MENU
          </h2>
          <div className="flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col items-start p-4 w-full rounded-xl animate-pulse"
                style={{ background: "#FFFCF1" }}
              >
                <div className="w-full h-[229px] bg-gray-300 rounded-lg" />
                <div className="h-6 bg-gray-300 rounded mt-5 w-3/4" />
                <div className="h-4 bg-gray-300 rounded mt-1 w-1/2" />
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Loading */}
        <section className="block md:hidden w-full h-[243px]" style={{ background: "#FFFCF1" }}>
          <h2 className="text-[20px] mb-2 font-bebas text-[#073027] pl-4">
            RECOMMEND PAIRING
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 pl-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-start p-2 w-[160px] rounded-xl animate-pulse"
                style={{ background: "#FFFCF1" }}
              >
                <div className="w-[133.65px] h-[112.5px] bg-gray-300 rounded-[8px]" />
                <div className="h-4 bg-gray-300 rounded mt-3 w-3/4" />
                <div className="h-3 bg-gray-300 rounded mt-1 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        {/* Desktop Error */}
        <section className="hidden md:block" style={{ background: "#FFFCF1" }}>
          <h2 className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2">
            RECOMMEND MENU
          </h2>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#EF9748] text-[#073027] rounded-lg hover:bg-opacity-90"
            >
              Try Again
            </button>
          </div>
        </section>

        {/* Mobile Error */}
        <section className="block md:hidden w-full h-[243px]" style={{ background: "#FFFCF1" }}>
          <h2 className="text-[20px] mb-2 font-bebas text-[#073027] pl-4">
            RECOMMEND PAIRING
          </h2>
          <div className="text-center py-8">
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#EF9748] text-[#073027] rounded-lg hover:bg-opacity-90 text-sm"
            >
              Try Again
            </button>
          </div>
        </section>
      </>
    );
  }

  // No items
  if (menuItems.length === 0) {
    return (
      <>
        <section className="hidden md:block" style={{ background: "#FFFCF1" }}>
          <h2 className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2">
            RECOMMEND MENU
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-600">No recommended items available at the moment.</p>
          </div>
        </section>

        <section className="block md:hidden w-full h-[243px]" style={{ background: "#FFFCF1" }}>
          <h2 className="text-[20px] mb-2 font-bebas text-[#073027] pl-4">
            RECOMMEND PAIRING
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-600 text-sm">No recommended items available.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Desktop */}
      <section className="hidden md:block" style={{ background: "#FFFCF1" }}>
        <h2 className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2">
          RECOMMEND MENU
        </h2>
        <div className="flex gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start p-4 w-full rounded-xl relative"
              style={{ background: "#FFFCF1" }}
            >
              <div className="w-full" style={{ height: "229px" }}>
                <Image
                  src={item.image_url || "/images/placeholder-food.jpg"}
                  alt={item.name}
                  width={272}
                  height={229}
                  className="object-cover w-full h-full rounded-lg"
                  style={{ borderRadius: "12px" }}
                />
              </div>
              <h3 className="text-[24px] text-black font-semibold mt-5">
                {item.name}
              </h3>
              <p className="text-[14px] mt-1" style={{ color: "#073027" }}>
                {item.discount_price ? `${item.discount_price} ${item.currency}` : `${item.price} ${item.currency}`}
              </p>
              {item.discount_price && (
                <p className="text-[12px] line-through text-gray-500">
                  {item.price} {item.currency}
                </p>
              )}

              <button
                className="absolute bottom-17 right-0 text-black flex items-center justify-center hover:scale-110 transition-transform"
                style={{
                  backgroundColor: "#EF9748",
                  width: "69.66px",
                  height: "69.66px",
                  borderRadius: "100px",
                  padding: "16px",
                  gap: "20px",
                  fontSize: "2rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                }}
                onClick={() => handleAdd(item)}
                aria-label={`Add ${item.name} to cart`}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile */}
      <section className="block md:hidden w-full h-[243px]" style={{ background: "#FFFCF1" }}>
        <h2 className="text-[20px] mb-2 font-bebas text-[#073027] pl-4">
          RECOMMEND PAIRING
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 pl-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 flex flex-col items-start p-2 w-[160px] rounded-xl relative"
              style={{ background: "#FFFCF1" }}
            >
              <div className="w-[133.65px] h-[112.5px] rounded-[8px] overflow-hidden mb-1">
                <Image
                  src={item.image_url || "/images/placeholder-food.jpg"}
                  alt={item.name}
                  width={134}
                  height={113}
                  className="object-cover w-full h-full rounded-[8px]"
                />
              </div>
              <h3 className="text-[14px] text-black font-normal mt-3">
                {item.name}
              </h3>
              <p className="text-[13px] mt-1" style={{ color: "#073027" }}>
                {item.discount_price ? `${item.discount_price} ${item.currency}` : `${item.price} ${item.currency}`}
              </p>
              {item.discount_price && (
                <p className="text-[11px] line-through text-gray-500">
                  {item.price} {item.currency}
                </p>
              )}

              <button
                className="absolute bottom-14 right-2 text-black flex items-center justify-center hover:scale-110 transition-transform"
                style={{
                  backgroundColor: "#EF9748",
                  width: "33.6px",
                  height: "33.6px",
                  borderRadius: "60px",
                  padding: "9.6px",
                  gap: "12px",
                  fontSize: "1.2rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
                }}
                onClick={() => handleAdd(item)}
                aria-label={`Add ${item.name} to cart`}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
