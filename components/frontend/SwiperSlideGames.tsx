"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function SwiperSlideGames({ data }: any) {
  return (
    <Swiper
      spaceBetween={20}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
        1536: { slidesPerView: 5 },
      }}
      className="w-full"
    >
      {data.map((item: any) => (
        <SwiperSlide key={item.id}>
          <div className="rounded flex justify-center">
            <Image
              width={250}
              height={150}
              src={item.image}
              alt={item.name}
              className="rounded object-cover"
              priority={false}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
