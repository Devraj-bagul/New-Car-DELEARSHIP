import React from "react";

const Description = ({ carDetail }) => {
  return (
    <div>
      { carDetail?.listingDescription? <div className="p-6 md:p-10 rounded-xl bg-[#111111] text-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.5)] mt-6 border border-white/10">
        <h2 className="my-2 font-medium text-2xl text-gold">Description</h2>
        <p className="leading-relaxed text-gray-300">{carDetail?.listingDescription}</p>
      </div>:
      <div className="w-full h-[100px] mt-7 bg-[#111111] animate-pulse border border-white/5 rounded-xl">

      </div>}
    </div>
  );
};

export default Description;
