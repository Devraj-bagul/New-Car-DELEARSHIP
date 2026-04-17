import Service from "@/Shared/Service";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { and, between, eq, gte, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";   
import useIsMobile from "../Shared/useIsMobile";

import CarItem from "@/components/CarItem";
import { useAppContext } from "../Shared/AppContext";
import CarCardSkeleton from "./ui/CarCardSkeleton";
import { Button } from "./ui/button";

const ALLCarsHere = () => {
  const { isTwoColumnGrid, showWishlistOnly, wishlist } = useAppContext();
  const [searchParam] = useSearchParams();
  const [carList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();


  const condition = searchParam.get("cars"); 
  const make = searchParam.get("make"); 
  const price = searchParam.get("price"); 

  useEffect(() => {
    GetCarList();
  }, [condition, make, price]);

  const GetCarList = async () => {
    setIsLoading(true);
    let filterList = [];

    if (condition) filterList.push(eq(CarListing.condition, condition));
    if (make) filterList.push(eq(CarListing.make, make));
    if (price) {
      if (price.includes("-")) {
        let [min, max] = price.split("-").map(Number);
        filterList.push(between(CarListing.sellingPrice, min, max));
      } else {
        let min = Number(price.replace("+", ""));
        filterList.push(gte(CarListing.sellingPrice, min));
      }
    }

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
        .where(and(...filterList))
        .orderBy(desc(CarListing.id));

      const resp = Service.FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedCars = showWishlistOnly 
    ? carList.filter(car => wishlist.includes(car.id))
    : carList;

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15, // Smooth one-by-one reveal
        delayChildren: isMobile ? 0 : 0.2
      }
    }
  };


  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 0 : 20,
      scale: isMobile ? 1 : 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: isMobile ? "tween" : "spring",
        stiffness: 100,
        damping: 15,
        duration: isMobile ? 0.2 : 0.5
      }
    }
  };


  return (
    <div className="pb-24 sm:pb-10">
      <div className="p-5 md:p-10 md:px-20 bg-transparent transition-colors duration-300">
        <h2 className="font-black text-2xl md:text-5xl text-midnight dark:text-white uppercase tracking-tighter mb-4">
          {showWishlistOnly ? "My Wishlist" : "All Premium Inventory"}
        </h2>
        
        {!showWishlistOnly && (
           <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.4em] font-black opacity-60 mb-8">
              Discover Excellence One by One
           </p>
        )}

        <motion.div 
          className={`grid mt-7 gap-6 md:gap-8 ${
            isTwoColumnGrid 
              ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`skeleton-${i}`} className="h-[320px]">
                  <CarCardSkeleton />
                </div>
              ))
            ) : displayedCars?.length > 0 ? (
              displayedCars.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="h-full will-change-transform"
                >
                  <CarItem car={item} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-24 bg-secondary/5 rounded-[2.5rem] border border-dashed border-border/60"
              >
                  <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No matches found for your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ALLCarsHere;
