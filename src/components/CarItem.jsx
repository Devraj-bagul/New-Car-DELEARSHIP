import React from "react";
import { Separator } from "./ui/separator";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStick } from "react-icons/gi";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";

const CarItem = ({ car }) => {
  return (
    <Link to={`/listing-details/${car?.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl bg-card border border-border hover:border-gold/50 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer relative group overflow-hidden flex flex-col h-full"
      >
        {/* Instagram Icon */}
        <div 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(car?.instagramUrl || "https://www.instagram.com/vinitautodeals_malegaon/?hl=en", "_blank");
          }}
          className="absolute top-4 right-4 z-30 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer border border-white/20 group/insta"
          title="Watch on Instagram"
        >
          <FaInstagram className="text-xl transition-all duration-300 group-hover/insta:text-[#E4405F]" style={{ color: '#E4405F' }} />
        </div>

        {/* Condition Badge */}
        <h2 className="absolute top-4 left-4 bg-gold text-midnight font-bold px-4 py-1.5 rounded-full text-xs z-20 shadow-[0_0_10px_rgba(212,175,55,0.5)] tracking-widest uppercase">
          {car?.condition}
        </h2>

        {/* IMAGE */}
        <div className="h-[180px] w-full bg-secondary/30 overflow-hidden rounded-t-xl group">
          {car?.images?.length > 0 ? (
            <img
              src={car.images[0].imageUrl}
              alt={car?.listingTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-xs uppercase tracking-widest">
              No Image Available
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 flex flex-col flex-grow">
          <h2 className="font-bold text-foreground text-lg md:text-xl mb-2 truncate group-hover:text-gold transition-colors duration-300">
            {car?.listingTitle}
          </h2>

          <Separator className="bg-border/50 my-3" />

          <div className="grid grid-cols-3 mt-4 gap-2 md:gap-3 text-muted-foreground flex-grow">
            <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 border border-border/50 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300">
              <BsFillFuelPumpFill className="text-xl mb-2 text-gold" />
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-center">{car?.mileage} <br/>Miles</h2>
            </div>

            <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 border border-border/50 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300">
              <IoSpeedometerOutline className="text-xl mb-2 text-gold" />
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-center">{car?.fuelType}</h2>
            </div>

            <div className="flex flex-col items-center p-2 md:p-3 rounded-lg bg-secondary/50 border border-border/50 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300">
              <GiGearStick className="text-xl mb-2 text-gold" />
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-center">{car?.transmission}</h2>
            </div>
          </div>

          <Separator className="my-5 bg-border/50" />

          <div className="flex items-center justify-between mt-auto">
            <h2 className="font-extrabold text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors duration-300">
              ₹ {car?.sellingPrice}
            </h2>
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-transparent border border-gold text-gold rounded-full text-xs md:text-sm font-semibold hover:bg-gold hover:text-midnight hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all duration-300">
              View Details <MdOutlineOpenInNew className="text-lg" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CarItem;
