import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCalendarDays } from "react-icons/hi2";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaCopy } from "react-icons/fa";

const ShareMenu = ({ showShareMenu, setShowShareMenu, handleShare }) => (
  <AnimatePresence>
    {showShareMenu && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
          onClick={() => setShowShareMenu(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-0 left-0 right-0 md:absolute md:top-20 md:bottom-auto md:right-0 md:left-auto w-full md:w-96 bg-white dark:bg-card border-t-4 md:border-4 border-black dark:border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] rounded-t-[3rem] md:rounded-[3rem] p-8 z-[70] overflow-hidden"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-green-500/30">
               <FaWhatsapp className="text-white text-3xl" />
            </div>
            <h3 className="font-black uppercase tracking-tighter text-2xl">Premium Share</h3>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Send details directly to WhatsApp</p>
          </div>

          <button 
            onClick={() => handleShare("whatsapp")}
            className="flex items-center justify-center gap-3 w-full p-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-transform active:scale-95 shadow-lg shadow-green-500/20"
          >
            <FaWhatsapp className="text-2xl" /> Share on WhatsApp
          </button>
          
          <button 
            onClick={() => setShowShareMenu(false)}
            className="w-full mt-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-black transition-colors"
          >
            Close Menu
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const DetailHeader = ({ carDetail }) => {
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const navigate = useNavigate();

  const shareUrl = window.location.href;

  const handleShare = () => {
    const message = `🚗 *${carDetail?.listingTitle?.toUpperCase()}* | ${carDetail?.vehicleRegCode || 'MH XX'}

💸 *SPECIAL PRICE:*
• Original: ₹${carDetail?.originalPrice || '-'}
• *Selling: ₹${carDetail?.sellingPrice}*

📊 *SPECIFICATIONS:*
• *MODEL:* ${carDetail?.model}
• *FUEL:* ${carDetail?.fuelType}
• *GEAR:* ${carDetail?.transmission}
• *KM:* ${carDetail?.mileage} KM
• *YEAR:* ${carDetail?.year}
• *COLOR:* ${carDetail?.color}
• *ENGINE:* ${carDetail?.engineSize || '1.5L'}

👔 *DEALER INFO:*
• *NAME:* Vinit Bagul
• *PHONE:* +91 9284438720

🔗 *VIEW ALL IMAGES & CATALOG:*
${shareUrl}

_High-end minimalist automotive commerce_`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      {carDetail?.listingTitle ? (
        <div className="flex flex-col gap-6">
          {/* MOBILE HEADER - [BACK] [TITLE] [SHARE] */}
          <div className="flex md:hidden items-center justify-between gap-4 sticky top-0 z-50 bg-[#Fcfcfc]/80 dark:bg-background/80 backdrop-blur-md py-4 -mx-5 px-5 border-b border-border/50">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-white dark:bg-card border-2 border-black rounded-full shadow-sm text-foreground active:scale-90 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-black dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            
            <div className="flex-1 text-center">
              <h2 className="font-black text-lg leading-tight text-black dark:text-white line-clamp-1 uppercase tracking-tighter">
                {carDetail?.listingTitle}
              </h2>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-3 bg-white dark:bg-card border-2 border-black rounded-full shadow-sm text-black active:scale-90 transition-transform"
              >
                <IoShareSocialOutline className="h-6 w-6 text-black dark:text-gold" />
              </button>
            </div>
          </div>

          <ShareMenu showShareMenu={showShareMenu} setShowShareMenu={setShowShareMenu} handleShare={handleShare} />

          {/* DESKTOP HEADER */}
          <div className="hidden md:flex justify-between items-start">
            <div>
              <h2 className="font-bold text-3xl md:text-5xl text-black dark:text-white tracking-tight uppercase">{carDetail?.listingTitle}</h2>
              <p className="text-sm md:text-lg text-neutral-500 mt-2 font-semibold tracking-[0.15em] uppercase opacity-80">{carDetail?.tagline || "Elite Performance Executive Driving"}</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-4 bg-white dark:bg-card border-2 border-black shadow-lg rounded-full hover:bg-neutral-50 transition-all duration-300 text-black dark:text-white"
                title="Share this listing"
              >
                <IoShareSocialOutline className="h-6 w-6 text-black dark:text-gold" />
              </button>
            </div>
          </div>

          {/* MOBILE TITLE SECTION */}
          <div className="md:hidden mt-2">
            <h1 className="font-bold text-2xl text-black dark:text-white leading-tight tracking-tight uppercase mb-2">
              {carDetail?.listingTitle}
            </h1>
            <p className="text-[10px] text-neutral-500 font-black tracking-widest uppercase opacity-80 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold"></span>
              {carDetail?.tagline || "Elite Performance Executive Driving"}
            </p>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap gap-4 mt-8">
            
            <div className="flex items-center gap-3 bg-white dark:bg-card border border-border/80 shadow-md rounded-2xl p-2 px-5 group hover:border-black transition-colors">
              <HiCalendarDays className="h-5 w-5 text-black dark:text-gold" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter leading-none">Year</span>
                <h2 className="text-black dark:text-white text-sm font-bold">{carDetail?.year}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-card border border-border/80 shadow-md rounded-2xl p-2 px-5 group hover:border-black transition-colors">
              <IoSpeedometerOutline className="h-5 w-5 text-black dark:text-gold" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter leading-none">KM Driven</span>
                <h2 className="text-black dark:text-white text-sm font-bold">{carDetail?.mileage} KM</h2>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-card border border-border/80 shadow-md rounded-2xl p-2 px-5 group hover:border-black transition-colors">
              <GiGearStickPattern className="h-5 w-5 text-black dark:text-gold" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter leading-none">Gear</span>
                <h2 className="text-black dark:text-white text-sm font-bold">{carDetail?.transmission}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-card border border-border/80 shadow-md rounded-2xl p-2 px-5 group hover:border-black transition-colors">
              <BsFillFuelPumpDieselFill className="h-5 w-5 text-black dark:text-gold" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter leading-none">Fuel</span>
                <h2 className="text-black dark:text-white text-sm font-bold">{carDetail?.fuelType}</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default DetailHeader;
