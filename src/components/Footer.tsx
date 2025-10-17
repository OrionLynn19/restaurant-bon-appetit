"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { categoriesApi } from "@/lib/api";
import type { Category } from "@/types/content";
import { useRouter } from "next/navigation";

function slugify(cat: string) {
  return cat
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          // Fallback to hardcoded categories if API fails
          setCategories([
            { id: "1", name: "Special Promotions", description: "", image_url: "", created_at: "", updated_at: "" },
            { id: "2", name: "European Cuisine", description: "", image_url: "", created_at: "", updated_at: "" },
            { id: "3", name: "Dessert & Drinks", description: "", image_url: "", created_at: "", updated_at: "" },
            { id: "4", name: "Salad", description: "", image_url: "", created_at: "", updated_at: "" },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback to hardcoded categories
        setCategories([
          { id: "1", name: "Special Promotions", description: "", image_url: "", created_at: "", updated_at: "" },
          { id: "2", name: "European Cuisine", description: "", image_url: "", created_at: "", updated_at: "" },
          { id: "3", name: "Dessert & Drinks", description: "", image_url: "", created_at: "", updated_at: "" },
          { id: "4", name: "Salad", description: "", image_url: "", created_at: "", updated_at: "" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle menu category click (UPDATED)
  const handleCategoryClick = async (categoryName: string) => {
    const hash = slugify(categoryName);
    
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/menu") {
        // Already on menu page - just update hash and trigger category change
        window.location.hash = hash;
        
        // Dispatch a custom event to notify the menu page
        window.dispatchEvent(new CustomEvent('categoryChange', { 
          detail: { categoryName } 
        }));
        
        // Scroll to menu section
        setTimeout(() => {
          const menuSection = document.getElementById("discover-our-menu");
          if (menuSection) {
            menuSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Navigate to menu page with hash
        router.push(`/menu#${hash}`);
      }
    }
  };

  return (
    <footer className="mt-1 text-sm w-full bg-white">
      {/* Desktop Footer */}
      <div className="hidden sm:block">
        <Image
          className="w-full h-[267px] object-cover object-center sm:h-[200px] xs:h-[120px]"
          src="/images/footer-background.png"
          alt="footer-bon-icon"
          width={1440}
          height={267}
          style={{
            maxWidth: "100vw",
            height: "auto",
          }}
        />
        <div className="flex mx-[40px] py-10 ">
          {/* Left: Clinic IconxInfo + Address */}
          <div className="flex gap-40 w-[55%] ">
            {/* Clinic IconxInfo */}
            <section className="flex flex-col justify-center items-center mb-6 ">
              <div className="flex flex-col items-center mb-4 gap-[24px]">
                <Image
                  className="mb-6"
                  src="/images/footer-bon-icon.png"
                  alt="footer-bon-icon"
                  width={248}
                  height={70}
                />
                <div className="flex justify-between gap-[24px]">
                  <a
                    href="https://www.facebook.com/elevaclinic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Image
                      src="/images/facebook.png"
                      alt="Facebook"
                      width={30}
                      height={30}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/eleva_clinic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/images/instagram.png"
                      alt="Instagram"
                      width={30}
                      height={30}
                    />
                  </a>
                  <a
                    href="https://www.tiktok.com/@eleva_clinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <Image
                      src="/images/line.png"
                      alt="TikTok"
                      width={30}
                      height={30}
                    />
                  </a>
                  <a
                    href="https://page.line.me/757enuzp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Line"
                  >
                    <Image
                      src="/images/tik tok.png"
                      alt="Line"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              </div>
            </section>
            {/* Address */}
            <section className="px-2 gap-10">
              <div>
                <h3
                  className="text-[34px] pb-2 text-[#EF9748]"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  ADDRESS
                </h3>
                <p
                  className="text-md font-[500] mb-2 text-black"
                  style={{
                    fontFamily: "var(--font-schibsted), Arial, Helvetica, sans-serif",
                  }}
                >
                  Floor 4, 991 Rama I Rd Bangkok, 10330
                </p>
                <p
                  className="text-md font-[500] mb-2 text-black"
                  style={{
                    fontFamily: "var(--font-schibsted), Arial, Helvetica, sans-serif",
                  }}
                >
                  Floor 4, 991 Rama I Rd Bangkok, 10330
                </p>
                <p
                  className="text-md font-[500] mb-2 text-black"
                  style={{
                    fontFamily: "var(--font-schibsted), Arial, Helvetica, sans-serif",
                  }}
                >
                  Floor 4, 991 Rama I Rd Bangkok, 10330
                </p>
              </div>
            </section>
          </div>
          {/* Right: Menu, Our Services, Explore */}
          <div className="w-[45%] grid grid-cols-3 gap-8 ">
            {/* Menu */}
            <section className="px-2">
              <div>
                <h3
                  className="text-[#EF9748] text-[34px] pb-2"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  MENU
                </h3>

                {/* Show loading state or categories */}
                {loading ? (
                  <div className="text-gray-500 text-sm">Loading menu...</div>
                ) : (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className="font-[500] text-black text-md mb-1 block hover:text-[#837e7d] text-left w-full"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.name}
                    </button>
                  ))
                )}
              </div>
            </section>
            {/* Our Services */}
            <section>
              <div>
                <h3
                  className="text-[#EF9748] text-[34px] pb-2"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  Explore
                </h3>
                <Link
                  href="/"
                  className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
                >
                  Home
                </Link>
                <Link
                  href="/menu"
                  className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
                >
                  Menu
                </Link>
                <Link
                  href="/contact"
                  className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
                >
                  About Us
                </Link>
              </div>
            </section>
            {/* Explore */}
            <section>
              <div>
                <h3
                  className="text-[#EF9748] text-[34px] pb-2"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  Contact Us
                </h3>
                <Link
                  href="#"
                  className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
                >
                  +6645322019
                </Link>
                <Link
                  href="https://www.bonappetit.com/"
                  className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
                >
                  @Bonappetit.com
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Mobile Footer */}
      <div className="block sm:hidden w-full bg-white pb-20">
        <Image
          className="w-full h-[267px] object-cover object-center sm:h-[200px] xs:h-[120px] pb-3"
          src="/images/footer-background.png"
          alt="footer-bon-icon"
          width={1440}
          height={267}
          style={{
            maxWidth: "100vw",
            height: "auto",
          }}
        />
        <div className="w-full h-[175px] bg-white px-4">
          <div className="grid grid-cols-3 place-content-around w-full gap-x-2 h-full">
            {/* Left Column */}
            <div className="flex flex-col gap-10 pt-10 items-center space-y-2 w-full">
              {/* Top: footer-bon-icon */}
              <div className="flex flex-col items-center">
                <Image
                  className="mb-2"
                  src="/images/footer-m.png"
                  alt="footer-m"
                  width={104}
                  height={60}
                />
              </div>
              {/* Bottom: Social icons */}
              <div className="flex flex-col items-center">
                <h3
                  className="text-[#EF9748] text-[16px] pb-2"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  Follow Us
                </h3>
                <div className="flex flex-row gap-x-2 justify-center">
                  <a
                    href="https://www.facebook.com/elevaclinic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-xs"
                  >
                    <Image
                      src="/images/facebook.png"
                      alt="Facebook"
                      width={16}
                      height={16}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/eleva_clinic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-xs"
                  >
                    <Image
                      src="/images/instagram.png"
                      alt="Instagram"
                      width={16}
                      height={16}
                    />
                  </a>
                  <a
                    href="https://www.tiktok.com/@eleva_clinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="text-xs"
                  >
                    <Image
                      src="/images/line.png"
                      alt="TikTok"
                      width={16}
                      height={16}
                    />
                  </a>
                  <a
                    href="https://page.line.me/757enuzp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Line"
                  >
                    <Image
                      src="/images/tik tok.png"
                      alt="Line"
                      width={16}
                      height={16}
                    />
                  </a>
                </div>
              </div>
            </div>
            {/* Middle Column */}
            <div className="flex flex-col space-y-2 w-full">
              {/* Top: Address section */}
              <div className="flex flex-col ">
                <h3
                  className="text-[#EF9748] text-[24px] pb-1"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  ADDRESS
                </h3>
                <p
                  className="text-[10px] scale-[0.8] origin-left leading-none text-black"
                  style={{
                    fontFamily: "var(--font-schibsted), Arial, Helvetica, sans-serif",
                  }}
                >
                  Floor 4, 991 Rama I Rd Bangkok, 10330
                </p>
                <p
                  className="text-[10px] scale-[0.8] origin-left leading-none text-black"
                  style={{
                    fontFamily: "var(--font-schibsted), Arial, Helvetica, sans-serif",
                  }}
                >
                  Floor 4, 991 Rama I Rd Bangkok, 10330
                </p>
                <p
                  className="text-[10px] scale-[0.8] origin-left leading-none text-black"
                  style={{
                    fontFamily: "var(--font-schibsted), Arial, Helvetica, sans-serif",
                  }}
                >
                  Floor 4, 991 Rama I Rd Bangkok, 10330
                </p>
              </div>
              {/* Bottom: Explore section */}
              <div className="flex flex-col gap-y-1">
                <h3
                  className="text-[#EF9748] text-[24px] pb-1"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  Explore
                </h3>
                <Link
                  href="/"
                  className="text-black text-[10px] scale-[0.8] origin-left leading-none hover:text-[#837e7d]"
                >
                  Home
                </Link>
                <Link
                  href="/menu"
                  className="text-black text-[10px] scale-[0.8] origin-left leading-none hover:text-[#837e7d]"
                >
                  Menu
                </Link>
                <Link
                  href="/contact"
                  className="text-black text-[10px] scale-[0.8] origin-left leading-none hover:text-[#837e7d]"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="text-black text-[10px] scale-[0.8] origin-left leading-none hover:text-[#837e7d]"
                >
                  About Us
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col space-y-2 w-full">
              {/* Top: Menu section */}
              <div className="flex flex-col gap-y-1">
                <h3
                  className="text-[#EF9748] text-[24px] pb-1"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  MENU
                </h3>
                {/* Show loading state or categories for mobile */}
                {loading ? (
                  <div className="text-gray-500 text-[10px]">Loading...</div>
                ) : (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className="text-[10px] scale-[0.8] origin-left leading-none text-black m-0 p-0 hover:text-[#837e7d] text-left w-full"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.name}
                    </button>
                  ))
                )}
              </div>
              {/* Bottom: Contact section */}
              <div className="flex flex-col gap-y-1 pt-1">
                <h3
                  className="text-[#EF9748] text-[22px] pb-1"
                  style={{
                    fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                  }}
                >
                  Contact Us
                </h3>
                <Link
                  href="#"
                  className="text-[9px] scale-[0.8] origin-left leading-none text-black m-0 p-0 hover:text-[#837e7d]"
                >
                  +6645322019
                </Link>
                <Link
                  href="https://www.bonappetit.com/"
                  className="text-[10px] scale-[0.8] origin-left leading-none text-black m-0 p-0 hover:text-[#837e7d]"
                >
                  @Bonappetit.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
