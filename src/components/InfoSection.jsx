import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "../Shared/useIsMobile";

const images = Array.from({ length: 12 }, (_, i) => `/car/car img ${i + 1}.jpg`);

const InfoSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative">
      <style>
        {`
          @keyframes goldenPulse {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}
      </style>

      <motion.h2 
        initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 dark:text-white font-['Playfair_Display',_serif] tracking-wide transition-colors duration-300"
      >
        The VINIT CARS <span className="text-gold">Collection</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-gray-400 max-w-2xl mx-auto mb-12"
      >
        Explore our Car Wall — a handpicked collection of comfortable, premium cars built for Indian roads and everyday luxury. Each car is carefully selected for performance, reliability, and a smooth driving experience.
      </motion.p>
      
      {/* Pinterest-style Masonry Layout via CSS columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.9, y: isMobile ? 0 : 20 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "100px" : "-50px" }}
            transition={{ duration: 0.5, delay: isMobile ? 0 : (index % 4) * 0.1 }}
            className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform will-change-transform"
          >
            <img 
              src={src} 
              alt={`AuraDrive Gallery ${index + 1}`} 
              className="w-full h-auto object-cover rounded-2xl md:group-hover:scale-105 transition-transform duration-700 ease-out relative z-0"
              loading="lazy"
              decoding="async"
            />
            {/* Smooth Random Golden Blink Effect - Disabled on mobile for performance */}
            {!isMobile && (
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none z-10 bg-gradient-to-tr from-gold/30 via-transparent to-gold/10 shadow-[inset_0_0_20px_rgba(212,175,55,0.4)] border border-gold/40"
                style={{
                  /* Pseudo-random durations and delays using the index so each blinks uniquely */
                  animation: `goldenPulse ${3 + (index % 3) * 1.5}s ease-in-out infinite ${index * 0.4}s`
                }}
              ></div>
            )}
            
            {/* Hover enhancement shadow - Disabled on mobile */}
            <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 shadow-[inset_0_0_40px_rgba(212,175,55,0.8)] transition-opacity duration-300 pointer-events-none rounded-2xl z-20"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


export default InfoSection;
