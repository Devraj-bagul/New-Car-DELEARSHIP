import Service from "@/Shared/Service";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { and, between, eq, gte, ilike, or } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Header from "@/components/Header";
import CarItem from "@/components/CarItem";
import { useAppContext } from "@/Shared/AppContext";

const SearchByOption = () => {
  const { isTwoColumnGrid, showWishlistOnly, wishlist } = useAppContext();
  const [searchParam] = useSearchParams();
  const [carList, setCarList] = useState([]);

  const condition = searchParam.get("cars");
  const make = searchParam.get("make");
  const price = searchParam.get("price");
  const query = searchParam.get("q");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCarList();
  }, [condition, make, price, query]);

  const GetCarList = async () => {
    setLoading(true);
    let filterList = [];

    if (condition) filterList.push(eq(CarListing.condition, condition));
    if (make) filterList.push(eq(CarListing.make, make));
    
    // Text Search Query
    if (query) {
      filterList.push(
        or(
          ilike(CarListing.listingTitle, `%${query}%`),
          ilike(CarListing.make, `%${query}%`),
          ilike(CarListing.model, `%${query}%`)
        )
      );
    }

    if (price) {
      if (price.includes("-")) {
        let [min, max] = price.split("-");
        filterList.push(between(CarListing.sellingPrice, Number(min), Number(max)));
      } else {
        let min = Number(price.replace("+", ""));
        filterList.push(gte(CarListing.sellingPrice, min));
      }
    }

    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(and(...filterList));

    const resp = Service.FormatResult(result);
    setCarList(resp);
    setLoading(false);
  };

  const displayedCars = showWishlistOnly 
    ? carList.filter(car => wishlist.includes(car.id))
    : carList;

  return (
    <div className="pb-32 sm:pb-10 min-h-screen">
      <Header />

      <div className="p-5 md:p-10 md:px-20 pt-40 md:pt-32">
        <h2 className="font-bold text-2xl md:text-4xl text-gray-900 dark:text-white transition-colors duration-300">
          {showWishlistOnly ? "My Wishlist" : (query ? `Search Results for: "${query}"` : "All Cars Listing")}
        </h2>

        {/* Car List */}
        <div className={`grid mt-7 gap-4 md:gap-6 ${
          isTwoColumnGrid 
            ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}>
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-[320px] rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"
              ></div>
            ))
          ) : displayedCars?.length > 0 ? (
            displayedCars.map((item, index) => (
              <div key={index} className="h-full">
                <CarItem car={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">🚗💨</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No Cars Found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any cars matching your search. Try different keywords or browse all cars.</p>
              <Link to="/search">
                <button className="bg-gold text-midnight px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-all">
                  Browse All Cars
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchByOption;
