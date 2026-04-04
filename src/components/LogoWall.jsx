import React from 'react';
import { motion } from 'framer-motion';

const logos = Array.from({ length: 15 }, (_, i) => `/logo/logo${i + 1}.jpg`);

const LogoWall = () => {
  return (
    <div className="w-full py-24 bg-midnight border-y border-gold/10 relative overflow-hidden">
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
          .animate-infinite-scroll-right:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gold/5 blur-[100px] pointer-events-none rounded-[100%] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
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
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-midnight to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-midnight to-transparent z-20 pointer-events-none"></div>

        <div className="animate-infinite-scroll-right gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4">
          {[...logos, ...logos].map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center group cursor-pointer flex-shrink-0"
            >
              {/* Premium Round Container */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative flex justify-center items-center rounded-full bg-gradient-to-tr from-gold via-amber-100 to-yellow-600 p-[3px] md:p-[4px] shadow-[0_5px_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_10px_35px_rgba(212,175,55,0.5)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-white flex justify-center items-center p-5 sm:p-6 relative overflow-hidden">
                  <img 
                    src={src} 
                    alt={`Automotive Brand Logo ${index + 1}`} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                    loading="lazy"
                  />
                  {/* Cinematic shine effect passing through */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-10"></div>
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
