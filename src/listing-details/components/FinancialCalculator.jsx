import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbSettingsSearch } from "react-icons/tb";

const FinancialCalculator = ({ carDetail }) => {
  // Helper to parse complex price strings like "₹ 13.25 Lakhs" or "13,25,000"
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    
    // Clean string: remove symbols, commas
    let cleanVal = priceStr.toString().replace(/₹|,|\s/g, "").toLowerCase();
    
    if (cleanVal.includes("lakh")) {
      return parseFloat(cleanVal.replace("lakh", "")) * 100000;
    }
    if (cleanVal.includes("cr") || cleanVal.includes("crore")) {
      return parseFloat(cleanVal.replace(/cr|crore/g, "")) * 10000000;
    }
    
    return parseInt(cleanVal) || 0;
  };

  const parsedBasePrice = parsePrice(carDetail?.sellingPrice);
  const basePrice = parsedBasePrice > 0 ? parsedBasePrice : 5000000; // Default 50 Lakh if not found
  const maxPrice = Math.max(basePrice, 5000000); // Allow up to 50L or base price

  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTenure, setLoanTenure] = useState(5);
  
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // Initial setup when basePrice changes
    const initialDownPayment = Math.round(basePrice * 0.2); // 20% down
    setDownPayment(initialDownPayment);
    setLoanAmount(basePrice - initialDownPayment);
  }, [basePrice]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, downPayment, interestRate, loanTenure]);

  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = loanTenure * 12;

    if (P > 0 && R > 0 && N > 0) {
      const emi = Math.round((P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1));
      const totalPayable = emi * N;
      const totalInt = totalPayable - P;

      setMonthlyEMI(emi);
      setTotalInterest(totalInt);
      setTotalPayment(totalPayable);
    } else {
      setMonthlyEMI(0);
      setTotalInterest(0);
      setTotalPayment(0);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val).replace("INR", "₹");
  };

  const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return (
    <div className="bg-card/50 backdrop-blur-xl border border-gold/10 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-gold rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">EMI Calculator</h2>
        </div>
        {parsedBasePrice > 0 && (
          <div className="bg-gold/10 border border-gold/20 px-4 py-2 rounded-full">
            <span className="text-xs text-gold uppercase tracking-widest font-bold mr-2">Car Price:</span>
            <span className="text-foreground font-black tracking-tight">{formatCurrency(basePrice)}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* SLIDERS SECTION */}
        <div className="space-y-8 md:space-y-10">
          {/* Loan Amount */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Loan Amount</label>
              <span className="text-xl font-bold text-gold">{formatCurrency(loanAmount)}</span>
            </div>
            <input 
              type="range" 
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              min={50000}
              max={maxPrice}
              step={10000}
              value={loanAmount}
              onChange={(e) => {
                const amount = parseInt(e.target.value);
                setLoanAmount(amount);
                // Adjust downpayment to keep total fixed to basePrice if we are in car mode
                if (parsedBasePrice > 0) setDownPayment(Math.max(0, basePrice - amount));
              }}
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Down Payment</label>
              <span className="text-xl font-bold text-gold">{formatCurrency(downPayment)}</span>
            </div>
            <input 
              type="range" 
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              min={0}
              max={maxPrice}
              step={10000}
              value={downPayment}
              onChange={(e) => {
                const amount = parseInt(e.target.value);
                setDownPayment(amount);
                if (parsedBasePrice > 0) setLoanAmount(Math.max(0, basePrice - amount));
              }}
            />
          </div>

          {/* Interest Rate & Tenure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Interest Rate</label>
                <span className="text-lg font-bold text-foreground">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
                min={5}
                max={20}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest block">Tenure (Years)</label>
              <div className="flex gap-2">
                {[1, 3, 5, 7].map(year => (
                  <button
                    key={year}
                    onClick={() => setLoanTenure(year)}
                    className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${loanTenure === year ? 'bg-gold text-midnight' : 'bg-secondary/50 text-muted-foreground hover:bg-gold/10 scale-95'}`}
                  >
                    {year}Y
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BREAKOUT BOX */}
          <div className="bg-gold/5 border border-gold/10 rounded-2xl p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <TbSettingsSearch className="text-6xl text-gold" />
             </div>
             <p className="text-gold font-semibold uppercase tracking-[0.2em] text-xs mb-2">Monthly EMI</p>
             <h3 className="text-4xl md:text-5xl font-black text-foreground">{formatCurrency(monthlyEMI)}</h3>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-[300px] aspect-square mb-10">
            {/* SVG Radial Chart */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-secondary/30" />
              {/* Principal Circle */}
              <circle 
                cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" 
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (interestRatio / 100)}`}
                className="text-gold"
              />
              {/* Interest Circle */}
              <circle 
                cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" 
                strokeDasharray={`${2 * Math.PI * 40 * (interestRatio / 100)} ${2 * Math.PI * 40}`}
                className="text-red-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
               <p className="text-xs text-muted-foreground uppercase tracking-widest">Total Payment</p>
               <p className="text-xl font-black text-foreground">{formatCurrency(totalPayment)}</p>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                <span className="text-sm font-medium text-muted-foreground">Principal Amount</span>
              </div>
              <span className="font-bold text-foreground">{formatCurrency(loanAmount)}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <span className="text-sm font-medium text-muted-foreground">Total Interest</span>
              </div>
              <span className="font-bold text-foreground">{formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
