import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OurMenuCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  description?: string;
  specialPromotion?: boolean;
}

export default function OurMenuCard(props: OurMenuCardProps) {
  const { image, name, price, originalPrice, description, specialPromotion } =
    props;
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/menu/detail/${encodeURIComponent(name)}`);
  };

  return (
    <div className="md:bg-white rounded-lg md:shadow-md flex flex-col items-center gap-2 w-[153px] h-[243px] md:flex-row md:w-full md:max-w-[644px] md:h-[238px] md:gap-0 md:overflow-hidden md:relative">
      {/* Left: Image */}
      <div className="relative flex justify-center items-center w-[153px] h-[153px] md:w-[238px] md:h-[238px] md:rounded-tl-[8px] md:rounded-bl-[8px] overflow-hidden md:flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={153}
          height={153}
          className="rounded w-[153px] h-[153px] md:rounded-tl-[8px] md:rounded-bl-[8px] md:w-[238px] md:h-[238px] object-cover"
          style={{ borderRadius: 8 }}
          sizes="(max-width: 768px) 153px, 238px"
        />
        {specialPromotion && (
          <>
            {/* Desktop badge*/}
            <span className="hidden md:block md:absolute md:top-0 md:right-0 z-10">
              <svg
                width="104"
                height="25"
                viewBox="0 0 104 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <mask id="desktop-badge-mask">
                    <rect x="0" y="0" width="104" height="25" fill="white" />
                    <polygon points="0,1 20,12.5 0,24" fill="black" />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="104"
                  height="25"
                  fill="#EF9748"
                  mask="url(#desktop-badge-mask)"
                />
                <foreignObject x="32" y="5" width="62" height="15">
                  <div className="w-[62px] h-[15px] flex items-center justify-center font-schibsted font-medium text-[12px] text-black leading-[15px] p-0 m-0">
                    Best Seller
                  </div>
                </foreignObject>
              </svg>
            </span>
            {/* Mobile badge */}
            <span className="absolute top-[12px] right-0 z-10 md:hidden">
              <svg
                width="71"
                height="17"
                viewBox="0 0 71 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <mask id="badge-mask">
                    <rect x="0" y="0" width="71" height="17" fill="white" />
                    <polygon points="0,0.3 13.2,8.62 0,16.75" fill="black" />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="71"
                  height="17"
                  fill="#EF9748"
                  mask="url(#badge-mask)"
                />
                <foreignObject x="26" y="4" width="41" height="10">
                  <div className="w-[41px] h-[10px] flex items-center justify-center font-schibsted font-normal text-[8px] text-black leading-[10px] p-0 m-0">
                    Best Seller
                  </div>
                </foreignObject>
              </svg>
            </span>
          </>
        )}
      </div>
      {/* Right: Content (all content padded together) */}
      <div className="flex flex-col justify-between gap-2 w-[146px] h-[70px] md:w-full md:flex-1 md:h-[238px] md:py-[26px] md:px-[24.5px]">
        <div className="flex flex-col justify-between h-full md:gap-3">
          <div>
            <h3 className="font-schibsted font-semibold text-[14px] text-[#073027] mb-0 md:text-[24px] md:text-[#1F1D1D] md:h-[30px] md:font-semibold md:mb-[24px]">
              {name}
            </h3>
            {description && (
              <p
                className="hidden md:block font-schibsted font-normal text-[16px] text-[#626262] md:w-full md:max-w-[357px] md:h-[80px] md:font-normal md:leading-[1] md:tracking-[0%]"
                style={{ marginBottom: 0 }}
              >
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 md:gap-[8px] h-[15px] md:h-[20px]">
              {originalPrice && (
                <span className="font-schibsted font-semibold text-[12px] text-[#838383] line-through md:text-[16px] md:w-[62px] md:h-[20px] md:gap-[10px]">
                  {originalPrice}
                </span>
              )}
              <span className="font-schibsted font-semibold text-[12px] text-[#000] rounded md:text-[16px] md:w-[56px] md:h-[20px] md:gap-[10px]">
                {price}
              </span>
            </div>
            <button
              className="w-7 h-7 rounded-full bg-[#EF9748] flex items-center justify-center text-[18px] border-black border-[1.5px] p-2 md:w-[40px] md:h-[40px] md:rounded-[25px] md:border-[1.5px] md:p-0 cursor-pointer"
              aria-label="Add to cart"
              onClick={handleDetail}
            >
              <span className="text-black">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
