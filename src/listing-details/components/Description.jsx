import React from "react";

const Description = ({ carDetail }) => {
  return (
    <div className="md:mt-10">
      { carDetail?.listingDescription ? (
        <div className="p-6 md:p-10 bg-[#f9fafb] dark:bg-black/20 border-4 border-black dark:border-white/20 rounded-[2.5rem] mt-10 shadow-[8px_8px_0px_rgba(212,175,55,0.4)] relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-gold"></div>
            <h2 className="font-bold text-2xl md:text-3xl text-black dark:text-white uppercase tracking-tight">
              Expert <span className="italic uppercase">Review</span>
            </h2>
          </div>
          
          <div className="prose prose-neutral max-w-none">
            <p className="leading-[1.8] text-base md:text-xl text-black dark:text-gray-300 font-medium tracking-tight whitespace-pre-line">
              {carDetail?.listingDescription}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[200px] mt-10 bg-secondary/20 animate-pulse border border-border/30 rounded-3xl"></div>
      )}
    </div>
  );
};

export default Description;
