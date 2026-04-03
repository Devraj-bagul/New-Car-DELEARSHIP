import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaGlobeAmericas } from 'react-icons/fa';

const OwnershipExperience = () => {
  return (
    <div className="w-full py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-white tracking-wide mb-4"
          >
            The <span className="text-gold font-serif italic">Ownership</span> Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto font-light text-lg"
          >
            Beyond a transaction, we offer a relationship built on trust, exclusivity, and uncompromising service.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Bespoke Delivery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-gold/30 p-10 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-9xl text-gold">
              <FaGem />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-8 border border-gold/20">
                <FaGem className="text-2xl text-gold" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-4 tracking-wide group-hover:text-gold transition-colors">Bespoke Delivery</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Every vehicle is presented with the white-glove treatment it deserves. From enclosed transport to a personalized handover ceremony, we ensure the first moment with your car is unforgettable.
              </p>
              <button className="text-gold border-b border-gold pb-1 text-sm tracking-widest uppercase hover:text-white hover:border-white transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Global Sourcing */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-gold/30 p-10 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-9xl text-gold">
              <FaGlobeAmericas />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-8 border border-gold/20">
                <FaGlobeAmericas className="text-2xl text-gold" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-4 tracking-wide group-hover:text-gold transition-colors">Global Sourcing</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Desire a specific marque or limited edition model? Our extensive global network allows us to source the rarest automobiles from private collections worldwide to fulfill your vision.
              </p>
              <button className="text-gold border-b border-gold pb-1 text-sm tracking-widest uppercase hover:text-white hover:border-white transition-colors">
                Inquire Now
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default OwnershipExperience;
