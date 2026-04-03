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
    <div className='p-10 rounded-xl border shadow-md'>
      <h2 className='font-medium'>Our Price</h2>
      <h2 className='font-bold text-4xl'>₹{carDetail?.sellingPrice}</h2>

      <Button 
        className="w-full mt-7" 
        size="lg" 
        onClick={handleWhatsapp}
      >
        <MdOutlineLocalOffer className='text-lg mr-2' /> 
        Make An Offer Price
      </Button>
    </div>
  )
}

export default Pricing;
