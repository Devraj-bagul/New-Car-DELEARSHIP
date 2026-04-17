import React from "react";
import { Separator } from "./ui/separator";
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
              window.open(car?.instagramUrl || "https://www.instagram.com/vinitautodeals_malegaon/?hl=en", "_blank");
            }}
            className="absolute top-3 right-3 z-30 flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer group/insta"
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
          <h2 className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-black font-extrabold px-3 py-1 rounded-full text-[9px] z-20 shadow-sm tracking-widest uppercase border border-transparent transition-colors duration-300">
            {car?.condition}
          </h2>
        )}

        {/* IMAGE / SLIDER */}
        <div className={`w-full bg-secondary/30 overflow-hidden relative group/slider ${
          isTwoColumnGrid ? "h-[140px]" : "h-[200px]"
        }`}>
          {!isTwoColumnGrid && images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity"
              >
                <HiChevronLeft />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity"
              >
                <HiChevronRight />
              </button>
              <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5 overflow-hidden">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentImageIndex ? "w-4 bg-gold shadow-[0_0_5px_rgba(212,175,55,0.8)]" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          <img
            src={images[currentImageIndex]}
            alt={car?.listingTitle}
            className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={`${isTwoColumnGrid ? "p-3" : "p-4 md:p-6"} flex flex-col flex-grow bg-card`}>
          <h2 className={`font-bold text-foreground mb-1 transition-colors duration-300 line-clamp-1 h-[1.5em] leading-tight ${
            isTwoColumnGrid ? "text-sm" : "text-lg md:text-xl"
          }`}>
            {car?.listingTitle}
          </h2>

          {!isTwoColumnGrid && (
            <>
              <Separator className="bg-border/50 my-3" />
              <div className="grid grid-cols-3 mt-4 gap-2 text-muted-foreground flex-grow">
                <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50 border border-border/50">
                  <BsFillFuelPumpFill className="text-lg mb-1 text-gold" />
                  <h2 className="text-[9px] font-semibold uppercase tracking-widest text-center">{car?.mileage} <br/>Run</h2>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50 border border-border/50">
                  <IoSpeedometerOutline className="text-lg mb-1 text-gold" />
                  <h2 className="text-[9px] font-semibold uppercase tracking-widest text-center">{car?.fuelType}</h2>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50 border border-border/50">
                  <GiGearStick className="text-lg mb-1 text-gold" />
                  <h2 className="text-[9px] font-semibold uppercase tracking-widest text-center">{car?.transmission}</h2>
                </div>
              </div>
              <Separator className="my-5 bg-border/50" />
            </>
          )}

          <div className={`flex items-center justify-between mt-auto`}>
            <h2 className={`font-extrabold text-foreground ${
              isTwoColumnGrid ? "text-base" : "text-xl md:text-2xl"
            }`}>
              ₹ {car?.sellingPrice}
            </h2>
            {!isTwoColumnGrid && (
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-gold text-gold rounded-full text-xs font-semibold hover:bg-gold hover:text-midnight transition-all duration-300">
                View <MdOutlineOpenInNew className="text-base" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
});


export default CarItem;
