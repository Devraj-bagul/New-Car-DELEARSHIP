import React from "react";
import { motion } from "framer-motion";

const images = Array.from({ length: 12 }, (_, i) => `/car/car img ${i + 1}.jpg`);

const InfoSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 dark:text-white font-['Playfair_Display',_serif] tracking-wide transition-colors duration-300"
      >
        The VINIT CARS <span className="text-gold">Collection</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            <img 
              src={src} 
              alt={`AuraDrive Gallery ${index + 1}`} 
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
