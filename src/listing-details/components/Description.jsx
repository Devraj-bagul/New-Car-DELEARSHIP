import React from "react";

const Description = ({ carDetail }) => {
  return (
    <div className="md:mt-10">
      { carDetail?.listingDescription ? (
        <div className="p-8 md:p-12 rounded-3xl bg-secondary/20 dark:bg-card border border-border/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)] mt-8 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-1 h-full bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></div>
          
          <h2 className="mb-6 font-black text-2xl md:text-4xl text-foreground tracking-tighter uppercase flex items-center gap-3">
            Expert <span className="text-gold italic font-serif lowercase">Review</span>
          </h2>
          
          <p className="leading-[1.8] text-base md:text-xl text-muted-foreground font-medium md:font-normal font-sans tracking-tight">
            {carDetail?.listingDescription}
          </p>
        </div>
      ) : (
        <div className="w-full h-[200px] mt-10 bg-secondary/20 animate-pulse border border-border/30 rounded-3xl"></div>
      )}
    </div>
  );
};

export default Description;
