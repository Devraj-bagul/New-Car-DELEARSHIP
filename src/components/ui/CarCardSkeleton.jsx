import React from "react";
import { motion } from "framer-motion";

const CarCardSkeleton = ({ type = "grid" }) => {
  if (type === "list") {
    return (
      <div className="flex flex-col bg-white dark:bg-card border border-border/40 rounded-[2.5rem] overflow-hidden shadow-sm animate-pulse w-full">
        <div className="w-full h-[220px] bg-slate-200 dark:bg-slate-800" />
        <div className="p-7 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
             <div className="h-2 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
             <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="flex justify-between py-4 border-y border-border/50">
             <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
             <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
             <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="flex justify-between items-center">
             <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
             <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border shadow-lg overflow-hidden animate-pulse flex flex-col h-full w-full">
      <div className="w-full h-[200px] bg-slate-200 dark:bg-slate-800" />
      <div className="p-4 flex flex-col gap-4 flex-grow">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="space-y-3 py-2 border-y border-border/50">
           <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded" />
        </div>
        <div className="flex justify-between items-center mt-auto">
           <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
           <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
