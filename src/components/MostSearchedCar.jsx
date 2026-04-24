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
            originalPrice: CarListing.originalPrice,
            sellingPrice: CarListing.sellingPrice,
            mileage: CarListing.mileage,
            fuelType: CarListing.fuelType,
            transmission: CarListing.transmission,
            condition: CarListing.condition,
            make: CarListing.make,
            model: CarListing.model,
            vehicleRegCode: CarListing.vehicleRegCode,
            instagramUrl: CarListing.instagramUrl,
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
        className="md:hidden flex flex-col gap-8 px-1"
        variants={containerVariants}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
      >
        <AnimatePresence mode="popLayout">
          {isLoading 
            ? [1, 2, 3].map((i) => <CarCardSkeleton key={i} />)
            : carList.slice(0, 10).map((car, index) => (
              <motion.div 
                key={car.id || index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <CarItem car={car} />
              </motion.div>
            ))}
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
