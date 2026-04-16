import Service from "@/Shared/Service";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { and, between, eq, gte } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";   // ⭐ ANIMATION IMPORT
import CarItem from "@/components/CarItem";
import { useAppContext } from "../Shared/AppContext";

const ALLCarsHere = () => {
  const { isTwoColumnGrid, showWishlistOnly, wishlist } = useAppContext();
  const [searchParam] = useSearchParams();
  const [carList, setCarList] = useState([]);

  const condition = searchParam.get("cars"); 
  const make = searchParam.get("make"); 
  const price = searchParam.get("price"); 

  useEffect(() => {
    GetCarList();
  }, [condition, make, price]);

  const GetCarList = async () => {
    let filterList = [];

    // Filter 1: Condition
    if (condition) {
      filterList.push(eq(CarListing.condition, condition));
    }

    // Filter 2: Make
    if (make) {
      filterList.push(eq(CarListing.make, make));
    }

    // Filter 3: Price
    if (price) {
      if (price.includes("-")) {
        let [min, max] = price.split("-");
        min = Number(min);
        max = Number(max);
        filterList.push(between(CarListing.sellingPrice, min, max));
      } else {
        let min = Number(price.replace("+", ""));
        filterList.push(gte(CarListing.sellingPrice, min));
      }
    }

    // Final DB Query
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(and(...filterList));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  const displayedCars = showWishlistOnly 
    ? carList.filter(car => wishlist.includes(car.id))
    : carList;

  return (
    <div className="pb-24 sm:pb-10">
      <div className="p-5 md:p-10 md:px-20 bg-transparent transition-colors duration-300">
        <h2 className="font-bold text-2xl md:text-4xl text-gray-900 dark:text-white transition-colors duration-300">
          {showWishlistOnly ? "My Wishlist" : "All Cars Listing"}
        </h2>

        {/* ⭐ Animated Car Grid */}
        <div className={`grid mt-7 gap-4 md:gap-6 ${
          isTwoColumnGrid 
            ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}>
          {displayedCars?.length > 0 ? (
            displayedCars.map((item, index) => (
              <motion.div
                key={index}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}          // fade + slide
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,                   // ⭐ stagger effect
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03 }}             // ⭐ hover pop
              >
                <CarItem car={item} />
              </motion.div>
            ))
          ) : (
            // Skeleton loaders
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[320px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ALLCarsHere;
