import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

const GlobalShowroom = () => {
  return (
    <div className="min-h-screen flex flex-col bg-midnight text-white">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-block p-4 rounded-full bg-gold/10 border border-gold/30 mb-6 group cursor-pointer hover:bg-gold/20 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gold group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-gold drop-shadow-lg mb-6 tracking-wide">
            Global Showroom
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 leading-relaxed">
            Our exclusive Global Showroom is currently undergoing a meticulous redesign to bring you an unparalleled luxury viewing experience.
          </p>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 text-sm md:text-base">
            We are curating a digital space that matches the prestige of our elite vehicles. Stay tuned for a breath-taking showcase of automotive masterpieces from around the world.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black rounded-full uppercase tracking-widest font-semibold transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
          >
            Return to Directory
          </button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default GlobalShowroom;
