import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiHome, HiHeart, HiAdjustments, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaCar } from "react-icons/fa";
import { useAppContext } from "../Shared/AppContext";
import { motion } from "framer-motion";

const MobileNavbar = () => {
  const { isTwoColumnGrid, setIsTwoColumnGrid, showWishlistOnly, setShowWishlistOnly } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "home",
      icon: HiHome,
      label: "Home",
      path: "/",
      onClick: () => {
        setShowWishlistOnly(false);
        if (location.pathname !== "/") navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "wishlist",
      icon: HiHeart,
      label: "Wishlist",
      activeColor: "text-red-500",
      isActive: showWishlistOnly,
      onClick: () => {
        if (location.pathname !== "/" && !location.pathname.startsWith("/search")) {
          navigate("/search");
        }
        setShowWishlistOnly(!showWishlistOnly);
      },
    },
    {
      id: "cars",
      icon: FaCar,
      label: "Cars",
      path: "/search",
      isActive: location.pathname.startsWith("/search") && !showWishlistOnly,
      onClick: () => {
        setShowWishlistOnly(false);
        navigate("/search");
      },
    },
    {
      id: "call",
      icon: HiPhone,
      label: "Call",
      onClick: () => {
        window.location.href = "tel:9284438720";
      },
    },
    {
      id: "location",
      icon: HiLocationMarker,
      label: "Maps",
      onClick: () => {
        window.open("https://maps.app.goo.gl/hHH2mwXLYE5S8Rpn9", "_blank");
      },
    },
    {
      id: "settings",
      icon: HiAdjustments,
      label: "Layout",
      isActive: isTwoColumnGrid,
      activeColor: "text-gold",
      onClick: () => setIsTwoColumnGrid(!isTwoColumnGrid),
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 pb-4 pointer-events-none">
      <div className="bg-black/90 dark:bg-black/95 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between py-2.5 px-1.5 pointer-events-auto overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive || (item.path && location.pathname === item.path);
          
          return (
            <motion.button
              key={item.id}
              onClick={item.onClick}
              whileTap={{ scale: 0.9, opacity: 0.8 }}
              className={`flex flex-col items-center gap-1 transition-all duration-300 relative py-1 flex-1 min-w-[50px] ${
                isActive 
                  ? (item.activeColor || "text-gold") 
                  : "text-gray-400"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-white/5 rounded-2xl -z-10 mx-1"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`text-xl ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "scale-100 opacity-70"} transition-all`} />
              <span className={`text-[9px] font-bold tracking-tight uppercase ${isActive ? "opacity-100" : "opacity-60"}`}>
                {item.label}
              </span>
              
              {item.id === "wishlist" && isActive && (
                <span className="absolute top-1 right-2 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavbar;
