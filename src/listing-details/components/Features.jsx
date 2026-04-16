import React from "react";
import { FaCheck } from "react-icons/fa";

const Features = ({ features }) => {
  // Safety: Ensure features is an object
  const featureList =
    typeof features === "object" && features !== null ? features : {};

  return (
    <div className="p-8 md:p-12 border border-border/60 bg-secondary/10 dark:bg-card shadow-2xl rounded-[2.5rem] my-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <h2 className="font-black text-3xl md:text-5xl text-foreground mb-1 tracking-tighter uppercase">
        Premium <span className="text-gold italic font-serif lowercase">Features</span>
      </h2>
      <p className="text-muted-foreground text-[10px] md:text-sm tracking-[0.3em] font-black uppercase mb-10 opacity-70 flex items-center gap-3">
        Equipped for excellence <span className="h-[2px] w-12 bg-gold/30"></span>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {Object.entries(featureList).map(([key, value]) =>
          value ? (
            <div 
              key={key} 
              className="group flex gap-3 items-center p-3 md:p-6 bg-white dark:bg-black/20 border border-border/40 rounded-2xl hover:bg-gold/5 hover:border-gold/50 shadow-sm transition-all duration-300"
            >
              <div className="flex-shrink-0 p-1.5 md:p-2.5 rounded-xl bg-gold/10 group-hover:bg-gold transition-all duration-500 shadow-inner group-hover:scale-110">
                <FaCheck className="text-gold group-hover:text-midnight text-[10px] md:text-base" />
              </div>
              <h2 className="capitalize font-black text-foreground text-[11px] md:text-lg tracking-tight group-hover:text-gold transition-colors duration-300 line-clamp-1">
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
