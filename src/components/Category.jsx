import Data from '@/Shared/Data'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Category = () => {
  return (
    <div className="mt-16 sm:mt-24 w-full">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="font-bold text-3xl text-center mb-10 text-gray-900 dark:text-white transition-colors duration-300"
      >
        Browse By Type
      </motion.h2>

      {/* Center Wrapper */}
      <div className="flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            flex flex-wrap justify-center
            gap-4 sm:gap-6
            max-w-6xl 
            w-full 
            mx-auto 
            px-4
          "
        >
          {Data.Category.map((category, index) => (
            <Link key={index} to={`/search/${category.name}`}>
              
              {/* CARD */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative cursor-pointer group w-[140px] h-[120px] sm:w-[160px] sm:h-[140px]"
              >
                {/* 🔥 NEON BLUE ROTATING BORDER */}
                <div
                  className="
                    absolute inset-0 rounded-xl p-[2px]
                    bg-[conic-gradient(#D4AF37,#F3E5AB,#D4AF37)]
                    animate-spin-slow
                    blur-[2px] opacity-60 group-hover:opacity-100 transition-opacity
                  "
                ></div>

                {/* MAIN CARD */}
                <div
                  className="
                    absolute inset-[2px] bg-card rounded-[10px] 
                    p-4 sm:p-5 
                    flex flex-col items-center justify-center
                    z-10
                  "
                >
                  <img src={category.icon} className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] object-contain dark:invert" alt="" />
                  <h2 className="mt-3 text-sm sm:text-base font-medium text-foreground text-center">
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
