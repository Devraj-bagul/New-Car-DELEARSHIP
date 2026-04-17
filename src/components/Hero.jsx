import React, { useState, useEffect } from "react";
import Search from "./Search";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  // A high-definition cinematic car driving video placeholder - Optimized for mobile
  const videoUrl = "https://res.cloudinary.com/dalo5zpik/video/upload/q_auto,f_auto/v1771954005/hero_video_blrxl8.mp4";

  return (
    <div className="relative w-full h-[55vh] min-h-[300px] max-h-[500px] mb-4 sm:h-[100vh] sm:min-h-[700px] sm:max-h-none sm:mb-0 bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center rounded-b-[20px] sm:rounded-b-0 shadow-2xl">
      
      {/* BACKGROUND VIDEO - Optimized Priority */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover scale-[1.05] motion-safe:animate-[zoom-out_20s_ease-out_infinite]"
          src={videoUrl}
        />
        
        {/* Cinematic Premium Overlay - Enhanced for readability in both modes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 flex flex-col items-center w-full px-4 pt-20 pb-10 gap-4 sm:gap-8 sm:px-10 sm:pt-40 sm:pb-14 translate-y-2 sm:translate-y-0">
        
        {/* BADGE */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="px-3 py-1 border border-white/30 rounded-full bg-black/40 backdrop-blur-sm sm:px-4"
        >
          <span className="text-white uppercase tracking-widest text-[10px] sm:text-xs font-semibold drop-shadow-sm">VINIT CARS Collection</span>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="
            font-['Playfair_Display',_serif]
            font-extrabold text-center leading-[1.2] sm:leading-[1.1]
            text-white
            text-2xl
            sm:text-[60px]
            tracking-tight
            drop-shadow-2xl
            max-w-[18ch] sm:max-w-none
          "
        >
          The Pride of Indian Roads: <br className="hidden sm:block" /> 
          <span 
            className="font-black italic"
            style={{
              color: '#d4af37',
              textShadow: `
                1px 1px 0 #b8962e,
                2px 2px 0 #8c6f1a,
                3px 3px 6px rgba(0,0,0,0.4)
              `
            }}
          >
             Vinit Cars – Excellence
          </span>
        </motion.h2>

        <motion.p
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.6 }}
           className="text-white/90 text-sm sm:text-xl max-w-[280px] sm:max-w-2xl text-center font-light tracking-wide drop-shadow-lg"
        >
         Handpicked premium cars for those who value trust and performance.
        </motion.p>

        {/* SEARCH BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full flex justify-center mt-4 sm:mt-8 z-30 px-4"
        >
          {/* Glassmorphic border container - Adaptive height for mobile */}
          <div className="p-[1px] rounded-[12px] sm:rounded-[16px] bg-gradient-to-r from-white/30 via-white/10 to-white/30 backdrop-blur-xl shadow-2xl w-[90%] sm:w-full sm:max-w-[600px] mx-auto">
            <div className="bg-white dark:bg-midnight/60 rounded-[11px] sm:rounded-[15px] overflow-hidden backdrop-blur-3xl shadow-sm min-h-[50px] sm:h-[50px] flex items-center p-1 sm:p-2 transition-all">
               <div className="w-full h-full">
                 <Search />
               </div>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default Hero;
