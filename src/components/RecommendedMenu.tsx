import Image from "next/image";
import React from "react";

// Desktop data (unchanged)
const menuItems = [
  {
    name: "Sweet Flakes",
    price: "85 BHT",
    imageUrl: "/images/sweet-potato-flakes.png",
  },
  {
    name: "Crunchy Munchies",
    price: "90 BHT",
    imageUrl: "/images/sweet-potato-flakes.png",
  },
  {
    name: "Savory Rolls",
    price: "75 BHT",
    imageUrl: "/images/sweet-potato-flakes.png",
  },
  {
    name: "Classic Treats",
    price: "80 BHT",
    imageUrl: "/images/sweet-potato-flakes.png",
  },
];

export default function RecommendedMenu() {
  return (
    <>
      {/* Desktop Layout */}
      <section
        className="p-11 hidden md:block"
        style={{ background: "#FFFCF1" }}
      >
        <h2
          className="text-[40px] mb-4 font-bebas text-[#073027] md:pl-2"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          RECOMMEND MENU
        </h2>
        <div className="flex gap-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 w-full rounded-xl relative"
              style={{ background: "#FFFCF1" }}
            >
              <div className="w-full" style={{ height: "229px" }}>
                <Image
                  src={item.imageUrl}
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
                {item.price}
              </p>
              <button
                className="absolute bottom-17 right-0 text-black flex items-center justify-center"
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
              >
                +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Layout */}
      <section
        className="block md:hidden w-full h-[243px] "
        style={{ background: "#FFFCF1" }}
      >
        <h2
          className="text-[20px] mb-2 font-bebas text-[#073027] pl-4"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          RECOMMEND PAIRING
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 pl-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-start p-2 w-[160px] rounded-xl relative"
              style={{ background: "#FFFCF1" }}
            >
              <div className="w-[133.65px] h-[112.5px] rounded-[8px] overflow-hidden mb-1">
                <Image
                  src={item.imageUrl}
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
                {item.price}
              </p>
              <button
                className="absolute bottom-14 right-2 text-black flex items-center justify-center"
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
