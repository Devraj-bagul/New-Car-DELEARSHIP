import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import useIsMobile from "../Shared/useIsMobile";

const SlideAction = ({ onComplete, label, icon: Icon, color, activeColor }) => {
  const [isComplete, setIsComplete] = React.useState(false);

  return (
    <div className="relative w-full h-[64px] bg-neutral-100 dark:bg-white/5 rounded-full border-2 border-black dark:border-white/20 p-1.5 overflow-hidden group">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-black transition-colors duration-500">
          {label}
        </span>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 260 }}
        dragElastic={0}
        onDragEnd={(e, info) => {
          if (info.offset.x > 200) {
            setIsComplete(true);
            onComplete();
            setTimeout(() => setIsComplete(false), 2000);
          }
        }}
        className={`relative z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-colors duration-300 ${isComplete ? activeColor : color}`}
      >
        <Icon className="text-white text-lg" />
      </motion.div>
    </div>
  );
};

const OwnersDetail = ({ carDetail }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 0 : 25 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-6 md:p-10 bg-[#f9fafb] dark:bg-black/20 border-2 border-black dark:border-white/20 rounded-[2.5rem] mt-10 shadow-sm relative overflow-hidden will-change-transform"
    >
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
            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full object-cover border-4 border-white dark:border-white/10 shadow-2xl"
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

      <div className="mt-12 flex flex-col gap-5">
        {/* 📞 Slide to Call */}
        <SlideAction 
          label="Slide to Call Dealer" 
          icon={FaPhoneAlt} 
          color="bg-black dark:bg-white/10" 
          activeColor="bg-black"
          onComplete={() => (window.location.href = "tel:+919284438720")}
        />

        {/* 💬 Slide to WhatsApp */}
        <SlideAction 
          label="Slide for WhatsApp" 
          icon={FaWhatsapp} 
          color="bg-[#25D366]" 
          activeColor="bg-[#20ba59]"
          onComplete={() => window.open("https://wa.me/919284438720", "_blank")}
        />

        <button 
          onClick={() => window.history.back()}
          className="text-neutral-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-2 hover:text-black dark:hover:text-white transition-colors"
        >
          ← Go Back to Inventory
        </button>
      </div>
    </motion.div>
  );
};

export default OwnersDetail;
