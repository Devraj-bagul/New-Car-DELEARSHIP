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
import { motion } from "framer-motion";

const ListingDetail = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  const navigate = useNavigate();

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

      <div className="relative z-10">
        <Header />

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="p-5 md:p-10 md:px-20 pt-28 md:pt-36"
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DetailHeader carDetail={carDetail} />
          </motion.div>

          {/* MOBILE */}
          <div className="block md:hidden space-y-6 mt-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <ImageGallery carDetail={carDetail} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Pricing carDetail={carDetail} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Description carDetail={carDetail} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Features features={carDetail?.features} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Specification carDetail={carDetail} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <OwnersDetail carDetail={carDetail} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <FinancialCalculator carDetail={carDetail} />
            </motion.div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 w-full mt-10 gap-5">
            <div className="col-span-2 space-y-5">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <ImageGallery carDetail={carDetail} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Description carDetail={carDetail} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Features features={carDetail?.features} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <FinancialCalculator carDetail={carDetail} />
              </motion.div>
            </div>

            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Pricing carDetail={carDetail} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Specification carDetail={carDetail} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <OwnersDetail carDetail={carDetail} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <MostSearchedCar />
        <Footer />
      </div>
    </motion.div>
  );
};

export default ListingDetail;
