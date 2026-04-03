// import React, { useEffect, useState } from "react";
// import { db } from "../../configs";
// import { CarListing, CarImages } from "../../configs/schema";
// import { eq, desc } from "drizzle-orm";
// import Service from "@/Shared/Service";
// import CarItem from "@/components/CarItem";

// const AllListings = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const loadCars = async () => {
//     const result = await db
//       .select()
//       .from(CarListing)
//       .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//       .orderBy(desc(CarListing.id));

//     const formatted = Service.FormatResult(result);
//     setCars(formatted);
//   };

//   return (
//     <div className="px-4 md:px-10 lg:px-20 mt-10">
//       <h1 className="text-3xl font-bold text-center mb-10">All Car Listings</h1>

//       {/* 3 columns Desktop, 2 columns Tablet, 1 column Mobile */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map((car, i) => (
//           <CarItem key={i} car={car} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllListings;
