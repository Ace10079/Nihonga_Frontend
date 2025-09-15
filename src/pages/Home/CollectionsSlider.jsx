import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const CollectionsSlider = ({ collections }) => {
  return (
    <section className="max-w-6xl mx-auto text-left px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Our Collections
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.3}
        breakpoints={{
          640: { slidesPerView: 2.3, spaceBetween: 20 },
          768: { slidesPerView: 3.3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 28 },
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="pb-6"
      >
        {collections.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white text-sm sm:text-base font-medium">
                  {item.name}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CollectionsSlider;
