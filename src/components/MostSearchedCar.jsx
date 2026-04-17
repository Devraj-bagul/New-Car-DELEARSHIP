import React, { useEffect, useState } from "react";
import CarItem from "./CarItem";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { desc, eq } from "drizzle-orm";
import Service from "@/Shared/Service";
import { useAppContext } from "../Shared/AppContext";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import CarCardSkeleton from "./ui/CarCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../Shared/useIsMobile";


const MostSearchedCar = () => {
  const [carList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useAppContext();
  const isMobile = useIsMobile();


  useEffect(() => {
    GetPopularCarList();
  }, []);

  const GetPopularCarList = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select({
          carListing: {
            id: CarListing.id,
            listingTitle: CarListing.listingTitle,
            sellingPrice: CarListing.sellingPrice,
            mileage: CarListing.mileage,
            fuelType: CarListing.fuelType,
            transmission: CarListing.transmission,
            condition: CarListing.condition,
          },
          carImages: {
            id: CarImages.id,
            imageUrl: CarImages.imageUrl,
            carListingId: CarImages.carListingId
          }
        })
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .orderBy(desc(CarListing.id))
        .limit(20);

      const resp = Service.FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15,
        delayChildren: isMobile ? 0 : 0.2
      }
    }
  };


  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.5,
        ease: "easeOut"
      }
    }
  };


  return (
    <div className="mx-auto px-4 md:px-10 lg:mx-24 my-20">
      <h2 className="font-black text-3xl md:text-5xl text-center mb-4 md:mb-10 text-gold drop-shadow-sm uppercase tracking-tighter">
        Most <span className="text-midnight dark:text-white italic font-serif lowercase">Searched</span> Cars
      </h2>
      <p className="text-center text-muted-foreground text-xs md:text-sm uppercase tracking-[0.3em] font-black mb-12 opacity-70 md:block hidden">
        Curated Selection of Elite Performance
      </p>

      {/* MOBILE LIST LAYOUT - (md:hidden) */}
      <motion.div 
        className="md:hidden flex flex-col gap-6 px-1"
        variants={containerVariants}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
      >
        <AnimatePresence mode="popLayout">
          {isLoading 
            ? [1, 2, 3].map((i) => <CarCardSkeleton key={i} type="list" />)
            : carList.slice(0, 7).map((car, index) => {
            const isLiked = isInWishlist(car?.id);
            return (
              <motion.div 
                key={car.id || index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="group relative flex flex-col bg-white dark:bg-card border border-border/40 rounded-[2.5rem] shadow-2xl overflow-hidden active:scale-[0.98] transition-all duration-300 will-change-transform"
              >
                {/* Image Section (Bigger Rectangle) */}
                <div className="relative w-full h-[220px] bg-secondary/20 overflow-hidden">
                  <img 
                    src={car.images[0]?.imageUrl || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"} 
                    className="w-full h-full object-cover"
                    alt={car.listingTitle}
                    loading="lazy"
                  />

                {/* Wishlist Icon (Top Right Over Image) */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.button 
                    whileTap={{ scale: 1.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(car?.id);
                    }}
                    className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg cursor-pointer transition-transform"
                  >
                     <motion.div
                       initial={false}
                       animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                       transition={{ duration: 0.3 }}
                     >
                       {isLiked ? (
                         <HiHeart className="w-6 h-6 text-red-500" />
                       ) : (
                         <HiOutlineHeart className="w-6 h-6 text-gray-600" />
                       )}
                     </motion.div>
                  </motion.button>
                </div>

                {/* Price Badge on Image */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-midnight/80 backdrop-blur-md border border-gold/30 text-white px-5 py-2 rounded-2xl shadow-xl">
                    <span className="font-black text-xl tracking-tighter">₹ {car.sellingPrice}</span>
                  </div>
                </div>
              </div>

              {/* Details Section (Spacious) */}
              <div className="p-7 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gold text-[10px] uppercase font-black tracking-[0.3em]">Premium Inventory</span>
                    <span className="flex-1 h-[1px] bg-gold/20"></span>
                  </div>
                  <h3 className="font-black text-2xl text-foreground leading-tight uppercase tracking-tighter line-clamp-1">
                    {car.listingTitle}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-muted-foreground font-black text-[11px] uppercase tracking-widest border-y border-border/50 py-4">
                   <div className="flex flex-col items-center gap-1">
                      <span className="text-gold opacity-50">Range</span>
                      <span>{car.mileage} KM</span>
                   </div>
                   <div className="h-8 w-[1px] bg-border"></div>
                   <div className="flex flex-col items-center gap-1">
                      <span className="text-gold opacity-50">Fuel</span>
                      <span>{car.fuelType}</span>
                   </div>
                   <div className="h-8 w-[1px] bg-border"></div>
                   <div className="flex flex-col items-center gap-1">
                      <span className="text-gold opacity-50">Drive</span>
                      <span>{car.transmission}</span>
                   </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-60 leading-none">Status</span>
                    <span className="text-xs font-black text-gold uppercase tracking-widest mt-1">Verified Offer</span>
                  </div>
                  
                  <a 
                    href={`/listing-details/${car.id}`}
                    className="bg-midnight text-white dark:bg-gold dark:text-midnight px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                  >
                    View Details
                  </a>
                </div>
              </div>
              
              {/* Transparent Link Overlay for Image Clicks */}
              <a href={`/listing-details/${car.id}`} className="absolute top-0 left-0 w-full h-[220px] z-10"></a>
            </motion.div>
          );
        })}
        
        </AnimatePresence>

        {!isLoading && (
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center pb-10"
          >
              <a href="/search" className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-gold hover:bg-gold/20 transition-all">
                  Access Elite High End Inventory <span className="text-lg">→</span>
              </a>
          </motion.div>
        )}
      </motion.div>

      {/* DESKTOP CAROUSEL LAYOUT - (md:block) */}
      <div className="hidden md:block relative px-2 md:px-12">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 pb-10">
            {isLoading 
              ? [1, 2, 3, 4].map((i) => (
                  <CarouselItem key={i} className="pl-2 md:pl-4 basis-[90%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <CarCardSkeleton />
                  </CarouselItem>
                ))
              : carList.map((car, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-[90%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="h-full">
                    <CarItem car={car} />
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-4 bg-midnight/50 border-gold/30 text-gold hover:bg-gold hover:text-midnight transition-all" />
            <CarouselNext className="absolute -right-4 bg-midnight/50 border-gold/30 text-gold hover:bg-gold hover:text-midnight transition-all" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default MostSearchedCar;
