"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { menuApi } from '@/lib/api';
import type { MenuItem } from '@/types/content';

export default function RecommendedMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recommended menu items
  useEffect(() => {
    const fetchRecommendedItems = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all available items and randomly select 4
        const response = await menuApi.getAll({
          available: true,
          sort: 'name',
          order: 'asc'
        });

        if (response.success && response.data) {
          // Randomly shuffle and take first 4 items
          const shuffled = response.data.sort(() => 0.5 - Math.random());
          setMenuItems(shuffled.slice(0, 4));
        } else {
          setError(response.error || 'Failed to load recommended items');
          // Fallback to empty array
          setMenuItems([]);
        }
      } catch (err) {
        setError('Failed to load recommended items');
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
          <h2
            className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            RECOMMEND MENU
          </h2>
          <div className="flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col items-start p-4 w-full rounded-xl animate-pulse"
                style={{ background: "#FFFCF1" }}
              >
                <div className="w-full h-[229px] bg-gray-300 rounded-lg"></div>
                <div className="h-6 bg-gray-300 rounded mt-5 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mt-1 w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Loading */}
        <section
          className="block md:hidden w-full h-[243px]"
          style={{ background: "#FFFCF1" }}
        >
          <h2
            className="text-[20px] mb-2 font-bebas text-[#073027] pl-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            RECOMMEND PAIRING
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 pl-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-start p-2 w-[160px] rounded-xl animate-pulse"
                style={{ background: "#FFFCF1" }}
              >
                <div className="w-[133.65px] h-[112.5px] bg-gray-300 rounded-[8px]"></div>
                <div className="h-4 bg-gray-300 rounded mt-3 w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded mt-1 w-1/2"></div>
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
          <h2
            className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
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
        <section
          className="block md:hidden w-full h-[243px]"
          style={{ background: "#FFFCF1" }}
        >
          <h2
            className="text-[20px] mb-2 font-bebas text-[#073027] pl-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
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

  // Show message if no items found
  if (menuItems.length === 0) {
    return (
      <>
        {/* Desktop No Items */}
        <section className="hidden md:block" style={{ background: "#FFFCF1" }}>
          <h2
            className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            RECOMMEND MENU
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-600">No recommended items available at the moment.</p>
          </div>
        </section>

        {/* Mobile No Items */}
        <section
          className="block md:hidden w-full h-[243px]"
          style={{ background: "#FFFCF1" }}
        >
          <h2
            className="text-[20px] mb-2 font-bebas text-[#073027] pl-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
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
      {/* Desktop Layout */}
      <section className="hidden md:block" style={{ background: "#FFFCF1" }}>
        <h2
          className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
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
              <h3
                className="text-[24px] text-black font-semibold mt-5"
                style={{ fontFamily: "var(--font-schibsted)" }}
              >
                {item.name}
              </h3>
              <p
                className="text-[14px] mt-1"
                style={{
                  fontFamily: "var(--font-schibsted)",
                  color: "#073027",
                }}
              >
                {item.discount_price 
                  ? `${item.discount_price} ${item.currency}` 
                  : `${item.price} ${item.currency}`
                }
              </p>
              {item.discount_price && (
                <p
                  className="text-[12px] line-through text-gray-500"
                  style={{ fontFamily: "var(--font-schibsted)" }}
                >
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
                onClick={() => {
                  // Add to cart functionality here
                  console.log('Add to cart:', item.name);
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Layout */}
      <section
        className="block md:hidden w-full h-[243px]"
        style={{ background: "#FFFCF1" }}
      >
        <h2
          className="text-[20px] mb-2 font-bebas text-[#073027] pl-4"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
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
              <h3
                className="text-[14px] text-black font-normal mt-3"
                style={{ fontFamily: "var(--font-schibsted)" }}
              >
                {item.name}
              </h3>
              <p
                className="text-[13px] mt-1"
                style={{
                  fontFamily: "var(--font-schibsted)",
                  color: "#073027",
                }}
              >
                {item.discount_price 
                  ? `${item.discount_price} ${item.currency}` 
                  : `${item.price} ${item.currency}`
                }
              </p>
              {item.discount_price && (
                <p
                  className="text-[11px] line-through text-gray-500"
                  style={{ fontFamily: "var(--font-schibsted)" }}
                >
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
                onClick={() => {
                  // Add to cart functionality here
                  console.log('Add to cart:', item.name);
                }}
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
