import React, { useEffect, useState } from "react";
import { 
  Sparkles, 
  Zap, 
  Gauge, 
  Cpu, 
  CheckCircle, 
  AlertTriangle,
  Info
} from "lucide-react";
import AiService from "@/Shared/AiService";
import { db } from "./../../../configs";
import { CarListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const AiInsights = ({ carDetail }) => {
  const [insights, setInsights] = useState(carDetail?.aiInsights);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (carDetail && !carDetail.aiInsights) {
      GetAiInsights();
    } else {
      setInsights(carDetail?.aiInsights);
    }
  }, [carDetail]);

  const GetAiInsights = async () => {
    setLoading(true);
    const carName = `${carDetail?.make} ${carDetail?.model} ${carDetail?.year} ${carDetail?.fuelType} ${carDetail?.transmission}`;
    
    try {
      const result = await AiService.generateAiInsights(carName);
      if (result) {
        setInsights(result);
        // Save to DB for caching
        await db
          .update(CarListing)
          .set({ aiInsights: result })
          .where(eq(CarListing.id, carDetail.id));
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate AI insights.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 rounded-xl border shadow-md mt-7 bg-white/50 backdrop-blur-sm animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!insights && !loading) return null;

  return (
    <div className="p-6 md:p-10 rounded-xl border shadow-md mt-7 bg-gradient-to-br from-white to-blue-50/30">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-blue-600 w-6 h-6" />
        <h2 className="font-bold text-2xl text-gray-800">AI Car Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview */}
        <div className="p-5 rounded-lg bg-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3 text-blue-700">
            <Info className="w-5 h-5" />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Overview</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{insights.overview}</p>
        </div>

        {/* Performance */}
        <div className="p-5 rounded-lg bg-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3 text-orange-600">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Performance</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{insights.performance}</p>
        </div>

        {/* Mileage */}
        <div className="p-5 rounded-lg bg-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3 text-green-600">
            <Gauge className="w-5 h-5" />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Fuel Efficiency</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{insights.mileage}</p>
        </div>

        {/* Key Features */}
        <div className="p-5 rounded-lg bg-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3 text-purple-600">
            <Cpu className="w-5 h-5" />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Key Tech</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{insights.features}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Pros */}
        <div className="p-5 rounded-lg bg-green-50/50 border border-green-100">
          <div className="flex items-center gap-2 mb-4 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-bold text-sm">PROS</h3>
          </div>
          <ul className="space-y-2">
            {insights.pros?.map((pro, index) => (
              <li key={index} className="text-gray-700 text-sm flex gap-2">
                <span className="text-green-500">•</span> {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="p-5 rounded-lg bg-red-50/50 border border-red-100">
          <div className="flex items-center gap-2 mb-4 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-sm">CONS</h3>
          </div>
          <ul className="space-y-2">
            {insights.cons?.map((con, index) => (
              <li key={index} className="text-gray-700 text-sm flex gap-2">
                <span className="text-red-400">•</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-[10px] text-gray-400 text-right italic">
        * Insights generated by AI. Verify with dealer for accuracy.
      </div>
    </div>
  );
};

export default AiInsights;
