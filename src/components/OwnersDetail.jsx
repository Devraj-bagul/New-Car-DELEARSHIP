import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

const OwnersDetail = ({ carDetail }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-8 border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] mt-7 bg-[#111111] dark:bg-[#111111]"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
        <h2 className="font-semibold tracking-wide text-xl text-gold uppercase">Seller Details</h2>
      </div>

      <div className="flex items-center gap-5">
        {/* Profile */}
        <div className="relative">
          <img
            src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zNHczTkVRYlZRVjdoSmJsUVJVU0NSMTdRS3YifQ?width=128"
            className="w-[80px] h-[80px] rounded-full object-cover border-2 border-gold/50 p-1"
            alt="Owner"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
            <MdVerifiedUser className="text-blue-500 text-xl" />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-white tracking-wide">Devraj Bagul</h2>
          <h2 className="text-gray-400 text-sm mt-1 uppercase tracking-wider font-medium">Verified Dealer</h2>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {/* 📞 Call Button */}
        <Button
          className="w-full bg-transparent border border-gold/40 hover:bg-gold/10 hover:border-gold text-white font-medium flex items-center justify-center gap-3 py-6 rounded-xl transition-all duration-300 group"
          onClick={() => (window.location.href = "tel:+919284438720")}
        >
          <div className="bg-gold/20 p-2 rounded-full group-hover:bg-gold transition-colors">
            <FaPhoneAlt className="text-gold group-hover:text-black text-sm" />
          </div>
          Call Dealer
        </Button>

        {/* 💬 WhatsApp Button */}
        <Button
          className="w-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:border-[#25D366] text-[#25D366] hover:text-white font-medium flex items-center justify-center gap-3 py-6 rounded-xl transition-all duration-300 group"
          onClick={() => window.open("https://wa.me/919284438720", "_blank")}
        >
          <FaWhatsapp className="text-xl" />
          WhatsApp Now
        </Button>

        {/* ⬅️ Back Button */}
        <Button
          className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-3 py-6 rounded-xl transition-all duration-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </motion.div>
  );
};

export default OwnersDetail;
