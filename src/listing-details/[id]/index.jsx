import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./../../../configs";
import { CarImages, CarListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import OwnersDetail from "@/components/OwnersDetail";
import FinancialCalculator from "../components/FinancialCalculator";
import Footer from "@/components/Footer";
import MostSearchedCar from "@/components/MostSearchedCar";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "@/Shared/useIsMobile";

const ListingDetail = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  const navigate = useNavigate();
  const isMobile = useIsMobile();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    GetCarDetail();
  }, [id]);

  const GetCarDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));

    const resp = Service.FormatResult(result);
    setCarDetail(resp[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen relative bg-[#Fcfcfc] dark:bg-background overflow-hidden"
    >
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        {/* The Grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.6] dark:opacity-[0.1]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center top'
          }}
        ></div>
        
        {/* Gradient Fade Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#Fcfcfc]/50 to-[#Fcfcfc] dark:via-background/80 dark:to-background pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-white/80 via-white/20 to-transparent dark:from-black/40 pointer-events-none"></div>
      </div>

      <div className="relative z-10 pb-32 md:pb-0">
        <Header />

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-5 md:p-10 md:px-20 pt-28 md:pt-36 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DetailHeader carDetail={carDetail} />
          </motion.div>

          {/* MOBILE */}
          <div className="block md:hidden space-y-6 mt-6">
            <div className="will-change-transform">
              <ImageGallery carDetail={carDetail} />
            </div>

            <div>
              <Pricing carDetail={carDetail} />
            </div>

            <div>
              <Description carDetail={carDetail} />
            </div>

            <div>
              <Specification carDetail={carDetail} />
            </div>

            <div>
              <Features features={carDetail?.features} />
            </div>

            <div>
              <OwnersDetail carDetail={carDetail} />
            </div>

            <div>
              <FinancialCalculator carDetail={carDetail} />
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 w-full mt-10 gap-8">
            <div className="col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <ImageGallery carDetail={carDetail} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <Description carDetail={carDetail} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <Features features={carDetail?.features} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <FinancialCalculator carDetail={carDetail} />
              </motion.div>
            </div>

            {/* STICKY SIDEBAR */}
            <div className="relative">
              <div className="sticky top-32 space-y-8 h-fit">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                  <Pricing carDetail={carDetail} />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                  <Specification carDetail={carDetail} />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <OwnersDetail carDetail={carDetail} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        <MostSearchedCar />
        <Footer />
      </div>
    </motion.div>
  );
};

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[100] w-14 h-14 bg-black dark:bg-gold text-white dark:text-black rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 dark:border-black/50 hover:scale-110 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ListingDetail;
