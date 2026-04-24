import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../Shared/useIsMobile';

const founder = {
  name: "VINIT BAGUL",
  role: "Founder & CEO",
  imageUrl: "https://thumbs.dreamstime.com/b/young-indian-man-suit-155582044.jpg"
};

const ExecutiveGallery = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full py-24 bg-white dark:bg-midnight text-foreground relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-0"
          >
            <span className="text-black dark:text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-4 block">The Visionary</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide mb-8 text-black dark:text-white leading-tight">
              Mind Behind <br/><span className="text-black dark:text-gold font-black italic">The Machine</span>
            </h2>
            
            <div className="pl-0 md:pl-6 border-l-0 md:border-l-2 border-black/10 dark:border-gold/50 flex flex-col items-center md:items-start mb-12 w-full">
              <p className="text-lg md:text-2xl font-serif italic text-black dark:text-white/90 mb-4 tracking-wide leading-relaxed max-w-md md:max-w-none">
                "Our commitment is not just to sell cars, but to deliver a masterpiece of engineering accompanied by an unparalleled ownership experience."
              </p>
              <h4 className="text-black dark:text-gold font-black tracking-widest uppercase text-xs animate-pulse">- Vinit Bagul</h4>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 group relative cursor-pointer"
          >
            {/* Image Container with elegant clean look */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl">
              {/* Subtle bottom gradient just for text legibility, no hover dimming effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
              
              <img 
                src={founder.imageUrl} 
                alt={founder.name}
                className="w-full h-full object-cover object-top md:group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              
              {/* Text Overlay inside Image */}
              <div className={`absolute bottom-0 left-0 p-8 lg:p-10 z-20 w-full ${!isMobile ? 'translate-y-4 group-hover:translate-y-0' : ''} transition-transform duration-500`}>
                <div className={`w-16 h-[2px] bg-gold mb-5 ${!isMobile ? 'scale-x-0 group-hover:scale-x-100' : ''} origin-left transition-transform duration-500 delay-100`}></div>
                <h3 
                  className="tracking-wider mb-2 drop-shadow-md"
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#fff',
                    textShadow: `
                      1px 1px 0 #999,
                      2px 2px 0 #666,
                      3px 3px 6px rgba(0,0,0,0.3)
                    `
                  }}
                >
                  {founder.name}
                </h3>
                <p 
                  className="font-serif italic text-lg tracking-wider drop-shadow-md"
                  style={{
                    color: '#d4af37',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}
                >
                  {founder.role}
                </p>
              </div>

              {/* Decorative Corner Borders - Reduced on mobile */}
              {!isMobile && (
                <>
                  <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/30 z-20 transition-all duration-500 group-hover:border-gold group-hover:w-16 group-hover:h-16 pointer-events-none"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/30 z-20 transition-all duration-500 group-hover:border-gold group-hover:w-16 group-hover:h-16 pointer-events-none"></div>
                </>
              )}
            </div>
            
            {/* Soft background glow - Reduced on mobile */}
            <div className={`absolute inset-0 bg-gold/10 ${isMobile ? 'blur-[40px]' : 'blur-[80px]'} -z-10 rounded-full w-3/4 h-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}></div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};


export default ExecutiveGallery;
