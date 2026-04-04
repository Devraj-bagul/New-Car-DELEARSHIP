import React from 'react';
import { motion } from 'framer-motion';

const founder = {
  name: "VINIT BAGUL",
  role: "Founder & CEO",
  imageUrl: "https://res.cloudinary.com/dalo5zpik/image/upload/v1774860997/owner_lyqb8n.jpg"
};

const ExecutiveGallery = () => {
  return (
    <div className="w-full py-24 bg-midnight text-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <span className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 block">The Visionary</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-8">
              Mind Behind <br/><span className="text-gold font-serif italic">The Machine</span>
            </h2>
            <p className="text-gray-400 font-light text-base lg:text-lg leading-relaxed mb-12">
              Curating automotive excellence requires an uncompromising eye for detail and a passion that borders on obsession. Meet the individual who shapes the vision and standard of Vinit Cars.
            </p>
            
            <div className="pl-6 border-l-2 border-gold/50">
              <p className="text-xl md:text-2xl font-serif italic text-white/90 mb-4 tracking-wide leading-snug">
                "Our commitment is not just to sell cars, but to deliver a masterpiece of engineering accompanied by an unparalleled ownership experience."
              </p>
              <h4 className="text-gold font-medium tracking-widest uppercase text-sm">- Vinit Bagul</h4>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 group relative cursor-pointer"
          >
            {/* Image Container with elegant clean look */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm bg-neutral-900 border border-neutral-800 shadow-2xl">
              {/* Subtle bottom gradient just for text legibility, no hover dimming effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
              
              <img 
                src={founder.imageUrl} 
                alt={founder.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 ease-out"
              />
              
              {/* Text Overlay inside Image */}
              <div className="absolute bottom-0 left-0 p-8 lg:p-10 z-20 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-16 h-[2px] bg-gold mb-5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                <h3 className="text-3xl lg:text-4xl font-semibold tracking-wider mb-2 text-white drop-shadow-md">{founder.name}</h3>
                <p className="text-gold font-serif italic text-lg tracking-wide drop-shadow-md">{founder.role}</p>
              </div>

              {/* Decorative Corner Borders */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/30 z-20 transition-all duration-500 group-hover:border-gold group-hover:w-16 group-hover:h-16 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/30 z-20 transition-all duration-500 group-hover:border-gold group-hover:w-16 group-hover:h-16 pointer-events-none"></div>
            </div>
            
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gold/10 blur-[80px] -z-10 rounded-full w-3/4 h-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default ExecutiveGallery;
