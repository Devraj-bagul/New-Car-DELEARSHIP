import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../Shared/useIsMobile';

const logos = Array.from({ length: 15 }, (_, i) => `/logo/logo${i + 1}.jpg`);

const LogoWall = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full py-24 bg-transparent border-y border-gold/10 relative overflow-hidden">
      <style>
        {`
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-infinite-scroll-right {
            display: flex;
            width: max-content;
            animation: scrollRight 40s linear infinite;
          }
        `}
      </style>

      {/* Background glow - Reduced on mobile */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-1/2 h-20' : 'w-3/4 h-32'} bg-gold/10 blur-[100px] pointer-events-none rounded-[100%] z-0`}></div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
          whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-foreground tracking-wide mb-4 transition-colors duration-300">
            <span className="text-gold font-serif italic">We offer a wide range of cars from trusted brands available with us.</span>
          </h2>
          <p className="text-gold uppercase tracking-[0.2em] font-semibold text-xs md:text-sm">
            Trusted brands we deal with
          </p>
        </motion.div>
      </div>

      {/* Auto Scrolling Logo Gallery */}
      <div className="w-full overflow-hidden pb-8 mx-auto relative z-10 mt-4">
        
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#Fcfcfc] dark:from-background to-transparent z-20 pointer-events-none transition-colors duration-300"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#Fcfcfc] dark:from-background to-transparent z-20 pointer-events-none transition-colors duration-300"></div>

        <div className="animate-infinite-scroll-right gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 will-change-transform">
          {[...logos, ...logos].map((src, index) => (
            <motion.div 
              key={index}
              initial={isMobile ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
              whileInView={isMobile ? {} : { opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: isMobile ? 0 : index * 0.05 }}
              className="flex flex-col items-center group cursor-pointer flex-shrink-0"
            >
              {/* Premium Round Container */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative flex justify-center items-center rounded-full bg-gradient-to-tr from-gold via-amber-100 to-yellow-600 p-[2px] md:p-[4px] shadow-[0_5px_20px_rgba(212,175,55,0.2)] md:group-hover:shadow-[0_10px_35px_rgba(212,175,55,0.5)] transition-all duration-500 transform md:group-hover:-translate-y-2 md:group-hover:scale-105 active:scale-95">
                <div className="w-full h-full rounded-full bg-white flex justify-center items-center p-4 sm:p-6 relative overflow-hidden">
                  <img 
                    src={src} 
                    alt={`Automotive Brand Logo ${index + 1}`} 
                    className="w-full h-full object-contain md:transition-transform duration-500 md:group-hover:scale-110 drop-shadow-sm"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Cinematic shine effect passing through - Disabled on mobile */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-10"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoWall;

