"use client";
import React, { useState, useRef, useEffect } from "react";

/* Convert Shorts link → Clean embed link */
const cleanEmbed = (url) => {
  let id = "";

  if (url.includes("shorts/")) {
    id = url.split("shorts/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    id = url.split("v=")[1].split("&")[0];
  }

  return `https://www.youtube.com/embed/${id}?autoplay=0&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1&loop=1&playlist=${id}`;
};

const reels = [
  { id: 1, original: "https://youtube.com/shorts/H_rBNXV6-zY?si=qDhDoObSLRC9HEq9" },
  { id: 2, original: "https://youtube.com/shorts/q0lI6s9voVU?si=-qgSBFMUeP7SZPkx" },
  { id: 3, original: "https://youtube.com/shorts/UZwhU9VeVHs?si=-GmWWVnkpjgYlR1r" },
  { id: 4, original: "https://youtube.com/shorts/jWARuEBdAJI?si=4iZN13uVJ1BjkbnU" },
];

const HappyCustomers = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const iframeRefs = useRef({});

  /* Pause all except active */
  useEffect(() => {
    Object.keys(iframeRefs.current).forEach((id) => {
      const iframe = iframeRefs.current[id];
      if (!iframe) return;

      if (Number(id) === activeVideo) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      } else {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    });
  }, [activeVideo]);

  return (
    <section className="w-full py-20 bg-background transition-colors duration-500 overflow-hidden relative">
      <style>
        {`
          @keyframes scrollReels {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-happy-customers-scroll {
            display: flex;
            width: max-content;
            animation: scrollReels 35s linear infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10 w-full">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-foreground tracking-wide transition-colors duration-300">
            Happy <span className="text-gold font-serif italic">Customers</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-light max-w-2xl mx-auto transition-colors duration-300">
            Experience the joy of our clients as they drive away in their dream vehicles.
          </p>
        </div>
      </div>

      {/* Full width scrolling container */}
      <div className="w-full relative py-4">
        {/* Fading Edges to make the scroll seamless */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

        {/* Scrolling Grid */}
        <div className="animate-happy-customers-scroll gap-6 sm:gap-8 md:gap-10 px-4">
          {[...reels, ...reels, ...reels].map((item, idx) => (
            <div
              key={idx}
              className="
                group relative bg-card rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] 
                p-2 border border-border flex flex-col items-center justify-center cursor-pointer
                aspect-[9/16] overflow-hidden hover:border-gold/50 transition-all duration-500
                w-[280px] sm:w-[320px] flex-shrink-0 hover:-translate-y-2
              "
              onClick={() => setActiveVideo(idx)}
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10 pointer-events-none"></div>
                <iframe
                  loading="lazy"
                  ref={(el) => (iframeRefs.current[idx] = el)}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  src={cleanEmbed(item.original)}
                  title={`Happy Customer Reel ${idx}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watch More Button */}
      <div className="flex justify-center mt-16 max-w-7xl mx-auto">
        <a
          href="https://youtube-shorts-zeta.vercel.app"
          target="_blank"
          className="flex items-center gap-3 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black font-semibold px-8 py-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 tracking-wider uppercase text-sm z-10 relative"
        >
          Watch More Reviews
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HappyCustomers;
