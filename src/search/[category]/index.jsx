import Header from "@/components/Header";
import Search from "@/components/Search";
import { db } from "./../../../configs";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CarImages, CarListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";
import { BiArrowBack } from "react-icons/bi";

const SearchByCategory = () => {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    GetCarList();
  }, []);

  const GetCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.category, category));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  return (
    <div>
      <Header />

      <div className="p-10 md:px-20">



        {/* Category Title */}
        <h2 className="font-bold text-4xl">{category}</h2>

        {/* List of CarList */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList?.length > 0
            ? carList.map((item, index) => (
                <div key={index}>
                  <CarItem car={item} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[320px] rounded-xl bg-slate-200 animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
