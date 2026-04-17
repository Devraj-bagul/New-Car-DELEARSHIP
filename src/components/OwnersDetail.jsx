import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import useIsMobile from "../Shared/useIsMobile";

const OwnersDetail = ({ carDetail }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 0 : 25 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-8 border border-white/10 rounded-[2.5rem] shadow-2xl mt-7 bg-[#111111] relative overflow-hidden will-change-transform"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
        <h2 className="font-black tracking-tighter text-2xl text-gold uppercase">Owner <span className="text-white italic font-serif lowercase">Details</span></h2>
      </div>

      <div className="flex items-center gap-5">
        {/* Profile */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dalo5zpik/image/upload/v1774860997/owner_lyqb8n.jpg"
            className="w-[85px] h-[85px] rounded-full object-cover border-2 border-gold/50 p-1 bg-black shadow-xl"
            alt="Owner"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-lg">
            <MdVerifiedUser className="text-blue-500 text-xl" />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-gold text-[10px] uppercase font-black tracking-[0.2em] mb-1">Expert Dealer</span>
          <h2 
            className="tracking-tight leading-none mb-1"
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#fff',
              textShadow: `
                1px 1px 0 #999,
                2px 2px 0 #666,
                3px 3px 6px rgba(0,0,0,0.3)
              `
            }}
          >
            Vinit Bagul
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full w-fit">
             <span className={`w-1.5 h-1.5 rounded-full bg-gold ${!isMobile ? 'animate-pulse' : ''}`}></span>
             <span className="text-gold text-[10px] uppercase tracking-wider font-black">Verified Dealer</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        {/* 📞 Call Button */}
        <Button
          className="w-full bg-white text-black hover:bg-gold transition-all duration-300 font-black uppercase tracking-tighter flex items-center justify-center gap-3 py-7 rounded-2xl shadow-lg shadow-gold/20 active:scale-95"
          onClick={() => (window.location.href = "tel:+919284438720")}
        >
          <FaPhoneAlt className="text-lg" />
          Call Dealer
        </Button>

        {/* 💬 WhatsApp Button */}
        <Button
          className="w-full bg-[#25D366] text-white hover:bg-[#20ba59] font-black uppercase tracking-tighter flex items-center justify-center gap-3 py-7 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-95"
          onClick={() => window.open("https://wa.me/919284438720", "_blank")}
        >
          <FaWhatsapp className="text-2xl" />
          WhatsApp Now
        </Button>

        {/* ⬅️ Back Button */}
        <Button
          className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 py-6 rounded-2xl transition-all duration-300 active:scale-95"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </motion.div>

  );
};


export default OwnersDetail;
