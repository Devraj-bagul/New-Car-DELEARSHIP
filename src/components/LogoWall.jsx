import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: "Tata Prestige", initial: "T", gradient: "from-yellow-300 via-gold to-yellow-700" },
  { name: "Mahindra Elite", initial: "M", gradient: "from-gray-300 via-gray-400 to-gray-600" },
  { name: "Hyundai", initial: "H", gradient: "from-blue-300 via-blue-400 to-blue-600" },
  { name: "Suzuki", initial: "S", gradient: "from-red-300 via-red-400 to-red-600" },
  { name: "Toyota", initial: "T", gradient: "from-slate-200 via-slate-300 to-slate-500" },
  { name: "Morgegaurage", initial: "MG", gradient: "from-emerald-300 via-emerald-400 to-emerald-600" }
];

const LogoWall = () => {
  return (
    <div className="w-full py-24 bg-midnight border-y border-gold/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gold/5 blur-[100px] pointer-events-none rounded-[100%]"></div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 block">Our Heritage</span>
          <h3 className="text-3xl md:text-5xl font-light text-white tracking-wide">
            Automotive <span className="text-gold font-serif italic">Excellence</span>
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24 w-full">
          {brands.map((brand, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 relative flex justify-center items-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_0_-5px_15px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] border border-neutral-700/50 group-hover:border-gold/30 transition-all duration-500 overflow-hidden">
                <span className={`text-5xl md:text-6xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-b ${brand.gradient} drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                  {brand.initial}
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
              </div>
              <span className="mt-5 text-gray-400 font-light tracking-widest text-xs md:text-sm group-hover:text-gold transition-colors duration-300 uppercase whitespace-nowrap">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LogoWall;
