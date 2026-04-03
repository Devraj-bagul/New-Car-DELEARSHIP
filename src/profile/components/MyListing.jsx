// import { Button } from "@/components/ui/button";
// import { useUser } from "@clerk/clerk-react";
// import { db } from "./../../../configs";
// import { CarImages, CarListing } from "./../../../configs/schema";
// import { desc, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Service from "@/Shared/Service";
// import CarItem from "@/components/CarItem";
// import { FaTrashAlt } from "react-icons/fa";

// function MyListing() {
//   const { user } = useUser();
//   const [carList, setCarList] = useState([])

//   useEffect(() => {
//     user && GetUserCarListing();
//   }, [user]);

//   const GetUserCarListing = async () => {
//     const result = await db
//       .select()
//       .from(CarListing)
//       .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//       .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(CarListing.id));


//     const resp=Service.FormatResult(result)
//     console.log(resp);
//     setCarList(resp);
//   };

//   return (
//     <div className="mt-6">
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-4xl">My Listing</h2>
//         <Link to={"/add-listing"}>
//           <Button>+ Add New Listing</Button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
//         {carList.map((item, index)=> (
//             <div key={index}>
//                 <CarItem car ={item}/>
//                 <div className="p-2 bg-gray-50 rounded-lg flex justify-between gap-3">
//                   <Link to={'/add-listing?mode=edit&id='+item?.id} className="w-full">
//                     <Button variant='outline' className="w-full">Edit</Button>
//                     </Link>
//                     <Button variant='destructive'><FaTrashAlt /></Button>
                    
//                 </div>
//             </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyListing;

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "./../../../configs";
import { CarImages, CarListing } from "./../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON,
);

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);

  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  // 🔥 DELETE LISTING + IMAGES
  const deleteListing = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      toast("Deleting listing...");

      // 1. GET ALL IMAGES OF THIS LISTING
      const carImages = await db
        .select()
        .from(CarImages)
        .where(eq(CarImages.carListingId, id));

      // 2. DELETE IMAGES FROM SUPABASE STORAGE
      for (let img of carImages) {
        const imagePath = img.imageUrl.split("/storage/v1/object/public/")[1];
        if (imagePath) {
          await supabase.storage.from("car-market").remove([imagePath]);
        }
      }

      // 3. DELETE IMAGES RECORDS FROM DB
      await db.delete(CarImages).where(eq(CarImages.carListingId, id));

      // 4. DELETE THE LISTING FROM DB
      await db.delete(CarListing).where(eq(CarListing.id, id));

      toast.success("Listing deleted successfully!");
      GetUserCarListing(); // refresh list
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete!");
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to={"/add-listing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-8">
        {carList.length > 0 ? (
          carList.map((item, index) => (
            <div key={index} className="relative group">
              <CarItem car={item} />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <Link
                  to={"/add-listing?mode=edit&id=" + item?.id}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-gold hover:text-midnight rounded-full shadow-lg"
                  >
                    <FaEdit className="text-lg" />
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-red-500/80 backdrop-blur-md border border-red-400/20 hover:bg-red-600 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteListing(item.id);
                  }}
                >
                  <FaTrashAlt className="text-sm" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-2xl">
            <p className="text-xl font-medium mb-4">You have no listings yet.</p>
            <Link to="/add-listing">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-midnight">
                Create Your First Listing
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyListing;

