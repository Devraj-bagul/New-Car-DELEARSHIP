import IconField from '@/add-listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

const Specification = ({carDetail}) => {
    console.log(carDetail);
  return (
    <div className="p-6 md:p-8 bg-card border border-border/50 shadow-[0_4px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.2)] rounded-3xl mt-7 transition-all">
      <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-2 tracking-wide font-['Playfair_Display']">
        Vehicle <span className="text-gold italic font-serif">Specs</span>
      </h2>
      <p className="text-muted-foreground text-xs tracking-widest uppercase mb-6">
        The finer details
      </p>

      {carDetail ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-4">
          {CarSpecification.map((item, index) => (
            <div 
              key={index} 
              className="group flex flex-col p-4 bg-secondary/50 border border-border/60 rounded-xl hover:bg-gold/5 hover:border-gold shadow-sm hover:shadow-[0_5px_15px_rgba(212,175,55,0.15)] transition-all duration-300"
            >
              <div className="p-2 mb-2 w-max rounded-lg bg-background shadow-inner text-muted-foreground group-hover:text-gold transition-colors duration-300">
                <IconField icon={item?.icon} />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1 break-words">
                {item.label}
              </span>
              <span className="font-extrabold text-foreground text-sm sm:text-base capitalize break-words leading-tight">
                {carDetail?.[item?.name] || "-"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[500px] rounded-3xl bg-secondary animate-pulse border border-border/30"></div>
      )}
    </div>
  );
};

export default Specification;
