"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import MenuCard from "@/components/Card/menu_card";
import { MENUS } from "@/data/menu";

export default function HomeMenuSlider() {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      loop
      freeMode={true}
      speed={3000}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 2, spaceBetween: 13 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 4, spaceBetween: 15 },
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const item = MENUS[i % MENUS.length];
        return (
          <SwiperSlide key={`${item.slug}-${i}`}>
            <MenuCard {...item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
