'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow} from "swiper/modules"; 
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import Image from "next/image";

export default function MenuPageSlider() {
  const images = [
    "/images/menu5.png",
    "/images/menu6.png",
    "/images/menu4.png",
    "/images/menu7.png",
    "/images/menu2.png",
  ];

  const slides = [...images, ...images]; 

  return (
    <Swiper
      className="menu-slider" 
      modules={[Autoplay, EffectCoverflow ]}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        stretch: -20,
        depth: 160,
        modifier: 0.8,
        scale: 0.87,
        slideShadows: false,
      }}
      speed={3500}
      autoplay={{ delay: 0 ,}}
      loop={true}
      centeredSlides={true}
      breakpoints={{
        0: { slidesPerView: 3},  
        768: { slidesPerView: 4},
        1024: { slidesPerView: 5} 
      }}
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i} className="flex justify-center items-center">
          <div className="w-full">
            <Image
              src={src}
              alt={`Menu ${i + 1}`}
              width={400}
              height={400}
              className="rounded-lg w-full h-auto object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
