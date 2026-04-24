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
    <div className='p-6 md:p-10 rounded-[2.5rem] bg-white dark:bg-card border-2 border-black dark:border-white/20 shadow-2xl transition-all relative overflow-hidden'>
      {/* Blinking Live Deal Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-500/10 rounded-full border border-green-200 dark:border-green-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Live Offer</span>
      </div>

      <div className="flex flex-col">
        <h2 className="text-neutral-500 dark:text-neutral-400 text-xs md:text-[14px] font-bold uppercase tracking-widest mb-4">
          Dealer <span className="italic">Valuation</span>
        </h2>
        
        <div className="flex flex-col gap-1">
          {carDetail?.originalPrice && (
            <div className="flex items-center gap-3 mb-1">
              <span className="text-neutral-400 line-through text-lg md:text-2xl font-bold italic">
                ₹{carDetail?.originalPrice}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tighter">
                Save Found
              </span>
            </div>
          )}
          <h2 className='font-black text-4xl md:text-6xl text-black dark:text-white tracking-tighter leading-none'>
            ₹{carDetail?.sellingPrice}
          </h2>
        </div>
      </div>

      <Button 
        className="w-full mt-8 py-8 rounded-2xl text-lg md:text-xl font-black uppercase tracking-tighter bg-black dark:bg-gold text-white dark:text-black hover:bg-gold hover:text-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-[0.98]" 
        size="lg" 
        onClick={handleWhatsapp}
      >
        <MdOutlineLocalOffer className='text-2xl mr-3' /> 
        Secure Best Price
      </Button>
      
      <p className="mt-5 text-[10px] md:text-xs text-center text-neutral-400 uppercase tracking-widest font-bold opacity-80">
        Authentic Pricing Guarantee
      </p>
    </div>
  )
}

export default Pricing;
