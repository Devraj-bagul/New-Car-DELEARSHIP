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
    <div className='p-6 md:p-10 rounded-3xl bg-card border border-border shadow-xl md:shadow-md transition-all'>
      <div className="flex flex-col md:block">
        <h2 className="text-muted-foreground text-xs md:text-base font-bold uppercase tracking-widest mb-1">
          Dealer <span className="text-gold italic">Valuation</span>
        </h2>
        <div className="flex items-baseline gap-2 md:block">
          <h2 className='font-black text-4xl md:text-5xl text-foreground tracking-tighter'>₹{carDetail?.sellingPrice}</h2>
          <span className="md:hidden text-xs font-bold text-gold uppercase opacity-80">Final Offer</span>
        </div>
      </div>

      <Button 
        className="w-full mt-6 md:mt-10 py-6 md:py-8 rounded-2xl md:rounded-xl text-lg md:text-xl font-black uppercase tracking-tighter shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all" 
        size="lg" 
        onClick={handleWhatsapp}
      >
        <MdOutlineLocalOffer className='text-2xl mr-3' /> 
        Secure Best Price
      </Button>
      
      <p className="mt-4 text-[10px] md:text-xs text-center text-muted-foreground uppercase tracking-widest font-bold opacity-60">
        Authentic Pricing Guarantee
      </p>
    </div>
  )
}

export default Pricing;
