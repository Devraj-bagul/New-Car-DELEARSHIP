import React from 'react';
import { motion } from 'framer-motion';

const founders = [
  {
    name: "Vikram Singh",
    role: "Founder & CEO",
    // Placeholder for founder image (high-fashion suit in garage)
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Arjun Mehta",
    role: "Head of Acquisitions",
    // Placeholder for founder image (high-fashion suit in garage)
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
  }
];

const ExecutiveGallery = () => {
  return (
    <div className="w-full py-24 bg-midnight text-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 block">The Visionaries</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide">
              Minds Behind <br/><span className="text-gold font-serif italic">The Machine</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md font-light text-sm md:text-base leading-relaxed">
            Curating automotive excellence requires an uncompromising eye for detail and a passion that borders on obsession. Meet the individuals who shaped Vinit Cars.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative cursor-pointer"
            >
              {/* Image Container with dramatic lighting effect */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-neutral-900">
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                <img 
                  src={founder.imageUrl} 
                  alt={founder.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-[1px] bg-gold mb-4 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                  <h3 className="text-2xl font-medium tracking-wider mb-1">{founder.name}</h3>
                  <p className="text-gold font-serif italic">{founder.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExecutiveGallery;
