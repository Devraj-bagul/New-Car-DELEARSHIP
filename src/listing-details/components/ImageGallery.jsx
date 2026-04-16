import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs, FreeMode } from "swiper/modules";
import { FaInstagram } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ImageGallery = ({ carDetail }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [fullscreenImg, setFullscreenImg] = useState(null);

  return (
    <div className="w-full relative">

      {/* Instagram Link Overlay */}
      {carDetail?.instagramUrl && (
        <div 
          onClick={() => window.open(carDetail?.instagramUrl, "_blank")}
          className="absolute top-4 right-4 z-20 flex items-center gap-2 p-2 px-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-2xl group"
        >
          <FaInstagram className="text-2xl transition-all duration-300 group-hover:rotate-12" style={{ color: '#E4405F' }} />
          <span className="text-xs font-bold uppercase tracking-widest hidden md:block group-hover:text-[#E4405F] transition-colors duration-300">Watch Reel</span>
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setFullscreenImg(null)}
        >
          <img
            src={fullscreenImg}
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl"
            alt="Car Full"
          />
        </div>
      )}

      {/* Main Slider */}
      <Swiper
        modules={[Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={10}
        className="rounded-3xl md:rounded-xl shadow-2xl w-full h-[280px] md:h-[500px] border border-white/5"
      >
        {carDetail?.images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.imageUrl}
              className="w-full h-full object-contain md:object-cover rounded-3xl md:rounded-xl cursor-pointer bg-black/5 dark:bg-white/5"
              alt="Car"
              onClick={() => setFullscreenImg(img.imageUrl)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="mt-4"
      >
        {carDetail?.images?.map((img, index) => (
          <SwiperSlide key={index} className="overflow-hidden rounded-lg">
            <div className="w-full h-20 sm:h-24 md:h-28 relative group cursor-pointer">
              <img
                src={img.imageUrl}
                className="w-full h-full object-cover rounded-lg border-2 border-white/10 group-hover:border-gold/60 transition-all duration-300 opacity-70 group-hover:opacity-100 swiper-thumb-active:opacity-100 swiper-thumb-active:border-gold"
                alt="Thumbnail"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
