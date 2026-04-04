import IconField from '@/add-listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

const Specification = ({carDetail}) => {
    console.log(carDetail);
  return (
    <div className="p-8 md:p-10 bg-card border border-border/50 shadow-[0_4px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.2)] rounded-3xl mt-7 transition-all">
      <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-2 tracking-wide font-['Playfair_Display']">
        Vehicle <span className="text-gold italic font-serif">Specifications</span>
      </h2>
      <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8">
        The finer details
      </p>

      {carDetail ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {CarSpecification.map((item, index) => (
            <div 
              key={index} 
              className="group flex flex-col p-4 md:p-5 bg-secondary/50 border border-border/60 rounded-2xl hover:bg-gold/5 hover:border-gold shadow-sm hover:shadow-[0_5px_15px_rgba(212,175,55,0.15)] transition-all duration-300 overflow-hidden"
            >
              <div className="p-2 mb-2 w-max rounded-lg bg-background shadow-inner text-muted-foreground group-hover:text-gold transition-colors duration-300">
                <IconField icon={item?.icon} />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1 truncate w-full">
                {item.label}
              </span>
              <span className="font-extrabold text-foreground text-sm sm:text-base md:text-lg capitalize truncate w-full">
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
