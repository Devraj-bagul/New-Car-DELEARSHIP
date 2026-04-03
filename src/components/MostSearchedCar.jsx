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

const MostSearchedCar = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    GetPopularCarList();
  }, []);

  const GetPopularCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(20);

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  return (
    <div className="mx-auto px-4 md:px-10 lg:mx-24 my-20">
      <h2 className="font-bold text-3xl md:text-4xl text-center mb-10 text-gold drop-shadow-sm">
        Most Searched Cars
      </h2>

      <div className="relative px-6 md:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-10">
            {carList.map((car, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="h-full">
                  <CarItem car={car} />
                </div>
              </CarouselItem>
            ))}
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
