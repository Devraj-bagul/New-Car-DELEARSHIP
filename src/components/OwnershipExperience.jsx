import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaGlobeAmericas, FaStar, FaStarHalfAlt, FaQuoteRight } from 'react-icons/fa';
import useIsMobile from '../Shared/useIsMobile';

const reviewsData = [
  {
    "name": "Rahul Patil",
    "review": "Vinit Cars is one of the best dealerships I have visited. The service is very smooth and professional. They guided me properly at every step. Highly recommended!"
  },
  {
    "name": "Sagar Jadhav",
    "review": "We purchased an XUV500 from Vinit Cars. The car performance is excellent and they provided a genuine and well-maintained vehicle. Thank you Vinit Cars for the great experience."
  },
  {
    "name": "Amit Deshmukh",
    "review": "Recently bought a Hyundai Verna 2023 model from Vinit Cars. Got a very good deal and they also helped with loan facility. I truly trust Vinit Auto Cars."
  },
  {
    "name": "Priya Kulkarni",
    "review": "I purchased a family car (Ertiga) from Vinit Cars. They handled all documentation and service smoothly. My experience was very happy and stress-free."
  },
  {
    "name": "Vikram Shinde",
    "review": "We bought a car from Vinit Cars and met the owner Vinit Bagul. He is very supportive and offers a wide range of cars in every budget. Great experience overall."
  },
  {
    "name": "Nilesh Pawar",
    "review": "Recently purchased a Mahindra pickup for transport use. The condition of the vehicle is excellent and they provided full service record. Very satisfied with the deal."
  },
  {
    "name": "Kiran More",
    "review": "Best place to buy second-hand cars in our area. All cars are properly checked and pricing is reasonable. Staff is very friendly and helpful."
  },
  {
    "name": "Sneha Joshi",
    "review": "Had a wonderful experience with Vinit Cars. The process was quick, transparent, and hassle-free. I got the perfect car for my needs."
  }
];

const carImages = Array.from({ length: 12 }, (_, i) => `/car/car img ${i + 1}.jpg`);

const OwnershipExperience = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full py-24 bg-transparent relative overflow-hidden">
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRightLayer {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: scrollLeft 40s linear infinite;
          }
          .animate-testimonials-row1 {
            display: flex;
            width: max-content;
            animation: scrollRightLayer 35s linear infinite;
          }
          .animate-testimonials-row2 {
            display: flex;
            width: max-content;
            animation: scrollLeft 35s linear infinite;
          }
        `}
      </style>
      <div className="max-w-[100vw] mx-auto lg:px-0">
        
        {/* Auto Scrolling Cars Gallery */}
        <div className="text-center mb-12 px-5">
           <motion.h2 
             initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
             whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-light text-foreground tracking-wide mb-4 transition-colors duration-300"
           >
             Our Exquisite <span className="text-gold font-serif italic">Fleet</span>
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
             whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-muted-foreground max-w-2xl mx-auto font-light text-lg"
           >
             Browse a selection of premium vehicles currently in our collection.
           </motion.p>
        </div>

        <div className="w-full relative overflow-hidden py-10">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#Fcfcfc] dark:from-background to-transparent z-20 pointer-events-none transition-colors duration-300"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#Fcfcfc] dark:from-background to-transparent z-20 pointer-events-none transition-colors duration-300"></div>
          
          {/* Scrolling Container */}
          <div className="animate-infinite-scroll gap-6 px-4 cursor-pointer will-change-transform">
            {[...carImages, ...carImages].map((src, index) => (
              <div 
                key={index} 
                className="w-72 h-48 md:w-[450px] md:h-[300px] flex-shrink-0 group relative rounded-2xl overflow-hidden bg-card border border-border/80 md:hover:border-gold shadow-lg md:hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-500"
              >
                {/* Image */}
                <img 
                  src={src} 
                  alt={`Vinit Cars Collection ${index + 1}`} 
                  className="w-full h-full object-cover filter brightness-95 md:group-hover:brightness-100 md:group-hover:scale-105 transition-all duration-700 ease-in-out"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Premium Golden Overlay subtle effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 md:group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 relative overflow-hidden py-10 w-[100vw] -ml-[calc(50vw-50%)]">
          
          {/* Fading Edges for Testimonials */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#Fcfcfc] dark:from-background to-transparent z-20 pointer-events-none transition-colors duration-300"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#Fcfcfc] dark:from-background to-transparent z-20 pointer-events-none transition-colors duration-300"></div>

          {/* Professional Ambient Background Design - Reduced on mobile */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full ${isMobile ? 'max-w-xl blur-[80px]' : 'max-w-4xl blur-[120px]'} bg-gold/10 rounded-full pointer-events-none z-0`}></div>

          <div className="relative z-10 w-full font-['Outfit',_sans-serif]">
            <div className="text-center mb-16 px-5">
              <motion.h3 
                initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-4 transition-colors duration-300"
              >
                Client <span className="text-gold font-serif italic">Testimonials</span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gold uppercase tracking-widest text-sm"
              >
                Stories from our valued customers
              </motion.p>
            </div>

            {/* Row 1: Scrolls Left to Right */}
            <div className="animate-testimonials-row1 gap-6 px-4 mb-6 cursor-default will-change-transform">
              {[...reviewsData.slice(0, 4), ...reviewsData.slice(0, 4), ...reviewsData.slice(0, 4)].map((item, index) => (
                <div key={`row1-${index}`} className="w-[300px] md:w-[400px] flex-shrink-0 group">
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-tr from-gold via-amber-100 to-yellow-600 ${isMobile ? 'p-[2px]' : 'p-[3px]'} shadow-[0_5px_15px_rgba(212,175,55,0.15)]`}>
                    <div className="w-full h-full rounded-2xl bg-white p-6 flex flex-col justify-between relative overflow-hidden z-10">
                      
                      {!isMobile && <FaQuoteRight className="absolute -bottom-4 -right-1 text-8xl text-gold/5 z-0 -rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110" />}

                      <div className="relative z-10">
                        <div className="flex text-yellow-500 mb-4 text-sm drop-shadow-sm">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                        </div>
                        <p className="text-neutral-700 font-medium italic text-sm md:text-base leading-relaxed mb-6">
                          "{item.review}"
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 relative z-10 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 border border-gold flex items-center justify-center text-gold font-serif font-bold text-lg pointer-events-none shadow-inner">
                          {item.name.charAt(0)}
                        </div>
                        <h4 className="font-semibold text-neutral-900 tracking-wide text-sm md:text-base">{item.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Scrolls Right to Left */}
            <div className="animate-testimonials-row2 gap-6 px-4 cursor-default will-change-transform">
              {[...reviewsData.slice(4, 8), ...reviewsData.slice(4, 8), ...reviewsData.slice(4, 8)].map((item, index) => (
                <div key={`row2-${index}`} className="w-[300px] md:w-[400px] flex-shrink-0 group">
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-tr from-gold via-amber-100 to-yellow-600 ${isMobile ? 'p-[2px]' : 'p-[3px]'} shadow-[0_5px_15px_rgba(212,175,55,0.15)]`}>
                    <div className="w-full h-full rounded-2xl bg-white p-6 flex flex-col justify-between relative overflow-hidden z-10">
                      
                      {!isMobile && <FaQuoteRight className="absolute -bottom-4 -right-1 text-8xl text-gold/5 z-0 -rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110" />}

                      <div className="relative z-10">
                        <div className="flex text-yellow-500 mb-4 text-sm drop-shadow-sm">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                        </div>
                        <p className="text-neutral-700 font-medium italic text-sm md:text-base leading-relaxed mb-6">
                          "{item.review}"
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 relative z-10 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 border border-gold flex items-center justify-center text-gold font-serif font-bold text-lg pointer-events-none shadow-inner">
                          {item.name.charAt(0)}
                        </div>
                        <h4 className="font-semibold text-neutral-900 tracking-wide text-sm md:text-base">{item.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OwnershipExperience;

