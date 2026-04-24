import IconField from '@/add-listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

const Specification = ({carDetail}) => {
    console.log(carDetail);
  return (
    <div className="p-6 md:p-10 bg-[#f9fafb] dark:bg-black/20 border-4 border-black dark:border-white/20 rounded-[2.5rem] mt-10 shadow-[8px_8px_0px_rgba(212,175,55,0.4)] relative">
      <div className="absolute top-10 left-0 w-1.5 h-12 bg-gold"></div>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-[2px] bg-gold"></div>
        <h2 className="font-bold text-2xl md:text-3xl text-black dark:text-white uppercase tracking-tight">
          Vehicle <span className="italic">Specs</span>
        </h2>
      </div>

      {carDetail ? (
        <div className="grid grid-cols-1 gap-y-5">
          {CarSpecification.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2 border-b border-neutral-200/50 dark:border-white/10"
            >
              <span className="text-[14px] font-medium text-[#6b7280] uppercase tracking-widest whitespace-nowrap">
                {item.label}
              </span>
              
              <span className="font-bold text-[#000] dark:text-white text-[16px] md:text-[18px] text-right truncate ml-4">
                {carDetail?.[item?.name] || "-"}
                {item.name === 'mileage' && carDetail?.[item.name] && " KM"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[400px] rounded-[2.5rem] bg-secondary/5 animate-pulse border border-border/20"></div>
      )}
    </div>
  );
};

export default Specification;
