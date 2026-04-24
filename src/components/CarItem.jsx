import React from "react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStick } from "react-icons/gi";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { HiHeart, HiOutlineHeart, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useAppContext } from "../Shared/AppContext";

const CarItem = React.memo(({ car }) => {
  const { toggleWishlist, isInWishlist, isTwoColumnGrid } = useAppContext();
  const isLiked = isInWishlist(car?.id);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const images = car?.images?.length > 0 
    ? car.images.map(img => img.imageUrl) 
    : ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"];

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link to={`/listing-details/${car?.id}`}>
      <motion.div 
        layout="position"
        className={`rounded-2xl bg-card border border-border hover:border-gold/50 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer relative group overflow-hidden flex flex-col h-full will-change-transform ${
          isTwoColumnGrid ? "p-0" : ""
        }`}
      >
        {/* Instagram Icon - Only in 1-column */}
        {!isTwoColumnGrid && (
          <div 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (car?.instagramUrl) {
                window.open(car.instagramUrl, "_blank");
              } else {
                toast.error("There is no insta link or video uploaded by owner");
              }
            }}
            className="absolute top-3 right-3 z-30 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer group/insta"
            title="Watch on Instagram"
          >
            <FaInstagram className="text-lg text-[#E4405F] transition-transform duration-300 group-hover/insta:scale-110" />
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button 
          whileTap={{ scale: 1.4 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(car?.id);
          }}
          className={`absolute z-30 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg cursor-pointer group/wishlist ${
            isTwoColumnGrid ? "top-2 right-2 w-7 h-7" : "top-3 right-14 w-9 h-9"
          }`}
          title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <motion.div
            initial={false}
            animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLiked ? (
              <HiHeart className={`${isTwoColumnGrid ? 'text-lg' : 'text-xl'} text-red-500`} />
            ) : (
              <HiOutlineHeart className={`${isTwoColumnGrid ? 'text-lg' : 'text-xl'} text-gray-600`} />
            )}
          </motion.div>
        </motion.button>

        {/* Condition Badge - Only in 1-column */}
        {!isTwoColumnGrid && (
          <h2 className="absolute top-3 left-3 bg-midnight/90 backdrop-blur-md text-white font-black px-4 py-1.5 rounded-full text-[10px] z-20 shadow-xl tracking-widest uppercase border border-white/20">
            {car?.condition}
          </h2>
        )}

        {/* IMAGE / SLIDER */}
        <div className={`w-full bg-secondary/10 overflow-hidden relative group/slider ${
          isTwoColumnGrid ? "h-[140px]" : "h-[160px] md:h-[190px]"
        }`}>
          {!isTwoColumnGrid && images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-black opacity-0 group-hover/slider:opacity-100 transition-opacity shadow-md"
              >
                <HiChevronLeft className="text-sm" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-black opacity-0 group-hover/slider:opacity-100 transition-opacity shadow-md"
              >
                <HiChevronRight className="text-sm" />
              </button>
              <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1 overflow-hidden">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentImageIndex ? "w-4 bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" : "w-1 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          <img
            src={images[currentImageIndex]}
            alt={car?.listingTitle}
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className={`${isTwoColumnGrid ? "p-3" : "p-4 md:p-5"} flex flex-col flex-grow bg-white dark:bg-card space-y-3`}>
          <h2 className={`font-black text-black dark:text-white transition-colors duration-300 line-clamp-1 leading-tight ${
            isTwoColumnGrid ? "text-[13px]" : "text-base md:text-lg"
          }`}>
            {car?.listingTitle}
          </h2>

          <div className="flex items-center justify-between gap-2 py-1.5 border-y border-border/30">
             <div className="flex flex-col items-center gap-1 flex-1 text-center">
                <IoSpeedometerOutline className="text-base text-neutral-400 dark:text-gold" />
                <span className="text-[9px] font-black uppercase tracking-tight text-neutral-600 whitespace-nowrap">{car?.mileage} KM</span>
             </div>
             <div className="h-4 w-[px] bg-border/30"></div>
             <div className="flex flex-col items-center gap-1 flex-1 text-center">
                <BsFillFuelPumpFill className="text-base text-neutral-400 dark:text-gold" />
                <span className="text-[9px] font-black uppercase tracking-tight text-neutral-600 whitespace-nowrap">{car?.fuelType}</span>
             </div>
             <div className="h-4 w-[px] bg-border/30"></div>
             <div className="flex flex-col items-center gap-1 flex-1 text-center">
                <GiGearStick className="text-base text-neutral-400 dark:text-gold" />
                <span className="text-[9px] font-black uppercase tracking-tight text-neutral-600 whitespace-nowrap">{car?.transmission}</span>
             </div>
          </div>

          <div className="pt-1">
            <div className="flex flex-col gap-0.5 mb-3">
              {car?.originalPrice ? (
                <div className="flex items-center gap-2">
                   <span className="text-[11px] md:text-sm text-gray-400 line-through font-bold">
                     ₹ {car.originalPrice}
                   </span>
                   <span className="text-[8px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">Save</span>
                </div>
              ) : null}
              <h2 className={`font-black text-black dark:text-gold leading-none tracking-tight ${
                isTwoColumnGrid ? "text-base" : "text-xl md:text-2xl"
              }`}>
                ₹ {car?.sellingPrice}
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 py-1.5 border-t border-border/20">
                <p className="text-[9px] font-black text-neutral-400 tracking-widest flex items-center gap-1.5">
                   <span className="uppercase">{car?.make}</span> {car?.model} <span className="w-1 h-1 bg-gold/50 rounded-full"></span> 
                   <span className="text-black dark:text-white font-bold uppercase">{car?.vehicleRegCode || 'MH XX'}</span>
                </p>
              </div>
              
              {!isTwoColumnGrid && (
                <button className="w-full h-10 bg-black dark:bg-gold text-white dark:text-black rounded-lg text-xs font-black uppercase tracking-[0.15em] hover:bg-gold hover:text-black dark:hover:bg-white transition-all shadow-sm group/btn">
                   <div className="flex items-center justify-center gap-2">
                      View Details <MdOutlineOpenInNew className="text-sm group-hover/btn:translate-x-0.5 transition-transform" />
                   </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});


export default CarItem;
