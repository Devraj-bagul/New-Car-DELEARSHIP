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
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="absolute right-0 mt-2 w-48 bg-card border border-border shadow-xl rounded-2xl p-2 z-50 overflow-hidden"
        >
          <button 
            onClick={() => handleShare("whatsapp")}
            className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-green-500/10 text-green-500 rounded-xl transition-colors"
          >
            <FaWhatsapp className="text-lg" /> WhatsApp
          </button>
          <button 
            onClick={() => handleShare("instagram")}
            className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-pink-500/10 text-pink-500 rounded-xl transition-colors"
          >
            <FaInstagram className="text-lg" /> Instagram
          </button>
          <button 
            onClick={() => handleShare("copy")}
            className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-gold/10 text-gold rounded-xl transition-colors border-t border-border/50 mt-1 pt-3"
          >
            <FaCopy className="text-lg" /> Copy Link
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
  const shareMessage = `Vinit Cars: ${carDetail?.listingTitle}\n💰 Price: ₹${carDetail?.sellingPrice}\n🔗 Check it out here: ${shareUrl}`;

  const handleShare = async (platform) => {
    if (platform === "whatsapp") {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      window.open(whatsappUrl, "_blank");
    } else if (platform === "instagram") {
      navigator.clipboard.writeText(shareMessage);
      toast.success("Details copied! You can now share it on Instagram.");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(shareMessage);
      toast.success("Link copied to clipboard!");
    } else {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Vinit Cars - " + carDetail?.listingTitle,
            text: shareMessage,
            url: shareUrl,
          });
        } catch (error) {
          console.log("Error sharing:", error);
        }
      } else {
        setShowShareMenu(!showShareMenu);
      }
    }
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      {carDetail?.listingTitle ? (
        <div className="flex flex-col gap-6">
          {/* MOBILE HEADER - [BACK] [TITLE] [SHARE] */}
          <div className="flex md:hidden items-center justify-between gap-4 sticky top-0 z-40 bg-[#Fcfcfc]/80 dark:bg-background/80 backdrop-blur-md py-4 -mx-5 px-5 border-b border-border/50">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-white dark:bg-card border border-border/50 rounded-full shadow-sm text-foreground active:scale-90 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            
            <div className="flex-1 text-center">
              <h2 className="font-extrabold text-lg leading-tight text-foreground line-clamp-1 uppercase tracking-tight">
                {carDetail?.listingTitle}
              </h2>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-3 bg-white dark:bg-card border border-border/50 rounded-full shadow-sm text-gold active:scale-90 transition-transform"
              >
                <IoShareSocialOutline className="h-6 w-6" />
              </button>
              <ShareMenu showShareMenu={showShareMenu} setShowShareMenu={setShowShareMenu} handleShare={handleShare} />
            </div>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:flex justify-between items-start">
            <div>
              <h2 className="font-bold text-3xl md:text-5xl text-foreground tracking-tighter">{carDetail?.listingTitle}</h2>
              <p className="text-sm md:text-xl text-muted-foreground mt-2 font-medium tracking-wide">{carDetail?.tagline}</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-4 bg-midnight/40 border border-gold/30 rounded-full hover:bg-gold/20 hover:border-gold/60 transition-all duration-300 text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] group backdrop-blur-md"
                title="Share this listing"
              >
                <IoShareSocialOutline className="h-8 w-8 transition-transform group-hover:scale-110" />
              </button>

              <ShareMenu showShareMenu={showShareMenu} setShowShareMenu={setShowShareMenu} handleShare={handleShare} />
            </div>
          </div>

          {/* MOBILE TITLE SECTION */}
          <div className="md:hidden mt-2">
            <h1 className="font-black text-4xl text-foreground leading-none tracking-tighter uppercase mb-2">
              {carDetail?.listingTitle}
            </h1>
            <p className="text-sm text-muted-foreground font-bold tracking-widest uppercase opacity-70 border-l-2 border-gold pl-3 py-1">
              {carDetail?.tagline || "Elite Performance Executive Driving"}
            </p>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            
            <div className="flex items-center gap-2 bg-blue-50 rounded-full p-2 px-3">
              <HiCalendarDays className="h-6 w-6 text-blue-800" />
              <h2 className="text-blue-800 text-sm">{carDetail?.year}</h2>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 rounded-full p-2 px-3">
              <IoSpeedometerOutline className="h-6 w-6 text-blue-800" />
              <h2 className="text-blue-800 text-sm">{carDetail?.mileage} Run</h2>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 rounded-full p-2 px-3">
              <GiGearStickPattern className="h-6 w-6 text-blue-800" />
              <h2 className="text-blue-800 text-sm">{carDetail?.transmission}</h2>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 rounded-full p-2 px-3">
              <BsFillFuelPumpDieselFill className="h-6 w-6 text-blue-800" />
              <h2 className="text-blue-800 text-sm">{carDetail?.fuelType}</h2>
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
