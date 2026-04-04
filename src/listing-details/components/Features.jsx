import React from "react";
import { FaCheck } from "react-icons/fa";

const Features = ({ features }) => {
  // Safety: Ensure features is an object
  const featureList =
    typeof features === "object" && features !== null ? features : {};

  return (
    <div className="p-8 md:p-10 border border-border/50 bg-card shadow-[0_4px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.2)] rounded-3xl my-7 transition-all">
      <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-2 tracking-wide font-['Playfair_Display']">
        Premium <span className="text-gold italic font-serif">Features</span>
      </h2>
      <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8">
        Equipped for excellence
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {Object.entries(featureList).map(([key, value]) =>
          value ? (
            <div 
              key={key} 
              className="group flex gap-4 items-center p-4 bg-secondary/50 border border-border/60 rounded-2xl hover:bg-gold/5 hover:border-gold shadow-sm hover:shadow-[0_5px_15px_rgba(212,175,55,0.15)] transition-all duration-300"
            >
              <div className="p-2 rounded-full bg-gold/10 group-hover:bg-gold transition-colors duration-300 shadow-inner">
                <FaCheck className="text-gold group-hover:text-midnight text-sm" />
              </div>
              <h2 className="capitalize font-bold text-foreground tracking-wide group-hover:text-gold transition-colors duration-300">
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
