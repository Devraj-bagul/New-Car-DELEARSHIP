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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
          {CarSpecification.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-5 bg-secondary/30 border border-border/40 rounded-3xl hover:bg-gold/5 hover:border-gold/50 transition-all duration-300 shadow-sm"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 p-3 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/30 text-gold scale-110">
                <IconField icon={item?.icon} />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] font-black text-muted-foreground/50 leading-none mb-1.5 truncate">
                  {item.label}
                </span>
                <span className="font-extrabold text-foreground text-sm md:text-lg capitalize leading-tight break-words">
                  {carDetail?.[item?.name] || "-"}
                </span>
              </div>
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
