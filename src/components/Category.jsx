import Data from '@/Shared/Data'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useIsMobile from '../Shared/useIsMobile'

const Category = () => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-16 sm:mt-24 w-full">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="font-bold text-3xl text-center mb-10 text-gray-900 dark:text-white transition-colors duration-300"
      >
        Browse By Type
      </motion.h2>

      {/* Center Wrapper */}
      <div className="flex justify-center w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`
            w-full max-w-6xl mx-auto pb-10
            ${isMobile 
              ? 'flex flex-nowrap overflow-x-auto gap-4 no-scrollbar snap-x snap-mandatory pt-2 scroll-smooth' 
              : 'flex flex-wrap justify-center gap-4 sm:gap-6'
            }
          `}
        >
          {Data.Category.map((category, index) => (
            <Link 
              key={index} 
              to={`/search/${category.name}`}
              className={isMobile ? 'snap-start flex-shrink-0' : ''}
            >
              
              {/* CARD / PILL */}
              <motion.div
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`
                  relative cursor-pointer group 
                  ${isMobile 
                    ? 'w-auto min-w-[110px] h-[48px] px-4' 
                    : 'w-[140px] h-[120px] sm:w-[160px] sm:h-[140px]'
                  }
                `}
              >
                {/* 🔥 NEON BLUE ROTATING BORDER - Disabled on mobile */}
                {!isMobile && (
                  <div
                    className="
                      absolute inset-0 rounded-xl p-[2px]
                      bg-[conic-gradient(#D4AF37,#F3E5AB,#D4AF37)]
                      animate-spin-slow
                      blur-[2px] opacity-60 group-hover:opacity-100 transition-opacity
                    "
                  ></div>
                )}

                {/* MAIN CARD / PILL CONTENT */}
                <div
                  className={`
                    absolute inset-[1px] bg-card dark:bg-card rounded-[25px] sm:rounded-[10px] 
                    flex items-center justify-center
                    z-10 transition-all duration-300
                    ${isMobile 
                      ? 'flex-row gap-3 border border-gold/20 shadow-sm' 
                      : 'inset-[2px] flex-col p-4 sm:p-5'
                    }
                  `}
                >
                  <img 
                    src={category.icon} 
                    className={`
                      object-contain dark:invert transition-transform duration-300
                      ${isMobile ? 'w-[20px] h-[20px]' : 'w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] mt-2'}
                    `} 
                    alt={category.name} 
                    loading="lazy" 
                  />
                  <h2 className={`
                    font-medium text-foreground transition-colors duration-300
                    ${isMobile ? 'text-xs' : 'mt-3 text-sm sm:text-base text-center line-clamp-1'}
                  `}>
                    {category.name}
                  </h2>
                </div>
              </motion.div>

            </Link>
          ))}
        </motion.div>
      </div>

    </div>
  )
}


export default Category
