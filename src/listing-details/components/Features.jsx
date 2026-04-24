import React from "react";
import { FaCheck } from "react-icons/fa";

const Features = ({ features }) => {
  // Safety: Ensure features is an object
  const featureList =
    typeof features === "object" && features !== null ? features : {};

  return (
    <div className="p-6 md:p-10 bg-white dark:bg-card border-4 border-black dark:border-white/20 rounded-[2.5rem] shadow-[8px_8px_0px_rgba(212,175,55,0.4)] transition-all relative mt-10">
      <div className="absolute top-10 left-0 w-1.5 h-12 bg-gold"></div>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-[2px] bg-gold"></div>
        <h2 className="font-bold text-2xl md:text-3xl text-black dark:text-white uppercase tracking-tight">
          Premium <span className="italic">Features</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {Object.entries(featureList).map(([key, value]) =>
          value ? (
            <div 
              key={key} 
              className="flex items-center gap-3 py-2 border-b border-neutral-200/50 dark:border-white/10 group"
            >
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-gold transition-colors">
                <FaCheck className="text-[10px] text-black dark:text-white group-hover:text-black" />
              </div>
              <h2 className="capitalize font-bold text-[#000] dark:text-white text-[15px] md:text-[17px] tracking-tight">
                {key.replace(/([A-Z])/g, " $1")}
              </h2>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Features;
