import { Button } from '@/components/ui/button'
import React from 'react'
import { MdOutlineLocalOffer } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Pricing = ({ carDetail }) => {

  const location = useLocation();

  // Get current full URL dynamically
  const currentUrl = window.location.origin + location.pathname;

  // WhatsApp phone number
  const whatsappNumber = "9284438720";

  const handleWhatsapp = () => {
    const message = `Hi, I want to make an offer on this car: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className='p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-card border-4 border-black dark:border-white/20 shadow-[8px_8px_0px_rgba(212,175,55,0.4)] transition-all relative overflow-hidden'>
      <div className="absolute top-8 left-0 w-1.5 h-12 bg-gold"></div>
      {/* Blinking Live Deal Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-500/10 rounded-full border border-green-200 dark:border-green-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Live Offer</span>
      </div>

      <div className="flex flex-col mt-4">
        <h2 className="text-neutral-500 dark:text-neutral-400 text-xs md:text-[14px] font-bold uppercase tracking-widest mb-4">
          Dealer <span className="italic">Valuation</span>
        </h2>
        
        <div className="flex flex-col gap-1">
          {carDetail?.originalPrice && (
            <div className="flex items-center gap-3 mb-1">
              <span className="text-neutral-400 line-through text-lg md:text-xl font-bold italic">
                ₹{carDetail?.originalPrice}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tighter">
                Save Found
              </span>
            </div>
          )}
          <h2 className='font-bold text-4xl md:text-6xl text-black dark:text-white tracking-tighter leading-none'>
            ₹{carDetail?.sellingPrice}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Pricing;
