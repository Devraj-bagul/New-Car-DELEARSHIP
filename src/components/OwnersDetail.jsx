import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import useIsMobile from "../Shared/useIsMobile";

const OwnersDetail = ({ carDetail }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-6 md:p-10 bg-[#f9fafb] dark:bg-black/20 border-4 border-black dark:border-white/20 rounded-[2.5rem] mt-10 shadow-[8px_8px_0px_rgba(212,175,55,0.4)] relative overflow-hidden will-change-transform"
    >
      <div className="absolute top-10 left-0 w-1.5 h-12 bg-gold"></div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-[2px] bg-gold"></div>
        <h2 className="font-bold text-2xl md:text-3xl text-black dark:text-white uppercase tracking-tight">
          Dealer <span className="italic">Details</span>
        </h2>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Profile */}
        <div className="relative mb-5">
          <img
            src="https://res.cloudinary.com/dalo5zpik/image/upload/v1774860997/owner_lyqb8n.jpg"
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-3xl object-cover object-top border-4 border-white dark:border-white/10 shadow-2xl"
            alt="Owner"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-midnight rounded-full p-1.5 shadow-xl border border-neutral-100 dark:border-white/5">
            <MdVerifiedUser className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-[0.3em] mb-2 px-3 py-1 bg-white dark:bg-white/5 rounded-full border border-neutral-100 dark:border-white/10">Premium Dealer</span>
          <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-4 leading-none">
            Vinit Bagul
          </h2>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-green-600 dark:text-green-400 text-[10px] uppercase tracking-widest font-black">Online Now</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {/* 📞 Call Button */}
        <button 
          onClick={() => (window.location.href = "tel:+919284438720")}
          className="w-full h-[64px] bg-black dark:bg-white/10 text-white rounded-full border-2 border-black dark:border-white/20 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/10 group"
        >
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <FaPhoneAlt className="text-white text-base" />
          </div>
          Call Dealer Now
        </button>

        {/* 💬 WhatsApp Button */}
        <button 
          onClick={() => window.open("https://wa.me/919284438720", "_blank")}
          className="w-full h-[64px] bg-[#25D366] text-white rounded-full border-2 border-[#25D366] flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-[#20ba59] transition-all active:scale-95 shadow-lg shadow-green-500/10 group"
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <FaWhatsapp className="text-white text-xl" />
          </div>
          WhatsApp Now
        </button>

        <button 
          onClick={() => window.history.back()}
          className="text-neutral-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-4 hover:text-black dark:hover:text-white transition-colors"
        >
          ← Go Back to Inventory
        </button>
      </div>
    </motion.div>
  );
};

export default OwnersDetail;
