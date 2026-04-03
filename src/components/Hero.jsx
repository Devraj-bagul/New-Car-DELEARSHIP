import React, { useState, useEffect } from "react";
import Search from "./Search";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  // A high-definition cinematic car driving video placeholder
  const videoUrl = "https://res.cloudinary.com/dalo5zpik/video/upload/v1771954005/hero_video_blrxl8.mp4";

  return (
    <div className="relative w-full h-[100vh] min-h-[700px] bg-midnight overflow-hidden flex flex-col justify-center items-center">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover"
          src={videoUrl}
        />
        
        {/* Professional dark overlay - reduced middle tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 flex flex-col items-center w-full px-4 pt-32 pb-14 gap-8 sm:px-10 lg:pt-40">
        
        {/* BADGE */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="px-4 py-1 border border-gold/30 rounded-full bg-midnight/50 backdrop-blur-sm"
        >
          <span className="text-gold uppercase tracking-widest text-xs font-semibold shadow-gold">The Elite Collection</span>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="
            font-['Playfair_Display',_serif]
            font-extrabold text-center leading-[1.1]
            text-4xl
            sm:text-[60px]
            tracking-tight
            text-gold
            drop-shadow-2xl
          "
        >
          The Pinnacle of Motion: <br className="hidden sm:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-gold to-yellow-600 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            NextGen Luxury Automotive
          </span>
        </motion.h2>

        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.6 }}
           className="text-gray-200 text-lg sm:text-xl max-w-2xl text-center font-light tracking-wide mb-2 shadow-black drop-shadow-lg"
        >
          Curated premium vehicles for the uncompromising individual.
        </motion.p>

        {/* SEARCH BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full flex justify-center mt-8 z-30"
        >
          {/* Glassmorphic border container */}
          <div className="p-[1px] rounded-[16px] bg-gradient-to-r from-gold/40 via-gold/10 to-gold/40 backdrop-blur-xl shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <div className="bg-midnight/60 rounded-[15px] overflow-hidden backdrop-blur-3xl min-w-[300px] sm:min-w-[800px]">
               <Search />
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default Hero;
