import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiHome, HiHeart, HiAdjustments, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaCar } from "react-icons/fa";
import { useAppContext } from "../Shared/AppContext";
import { motion } from "framer-motion";

const MobileNavbar = () => {
  const { isTwoColumnGrid, setIsTwoColumnGrid, showWishlistOnly, setShowWishlistOnly, wishlist } = useAppContext();
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
      activeColor: "text-green-500",
      onClick: () => {
        window.location.href = "tel:9284438720";
      },
    },
    {
      id: "location",
      icon: HiLocationMarker,
      label: "Maps",
      activeColor: "text-blue-500",
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
      <div className="bg-white/90 dark:bg-black/95 backdrop-blur-2xl border border-black/5 dark:border-white/5 rounded-3xl shadow-xl dark:shadow-[0_-12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between py-2.5 px-1.5 pointer-events-auto overflow-hidden transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive || (item.path && location.pathname === item.path);
          
          let iconColor = isActive ? (item.activeColor || "text-gold") : "text-black/60 dark:text-gray-400";
          if (!isActive) {
             if (item.id === 'call') iconColor = "text-green-600/70 dark:text-green-500/70";
             if (item.id === 'location') iconColor = "text-blue-600/70 dark:text-blue-500/70";
          }
          
          return (
            <motion.button
              key={item.id}
              onClick={item.onClick}
              whileTap={{ scale: 0.9, opacity: 0.8 }}
              className={`flex flex-col items-center gap-1 transition-all duration-300 relative py-1 flex-1 min-w-[50px] ${iconColor}`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-gold/10 dark:bg-white/5 rounded-2xl -z-10 mx-1"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative">
                <Icon className={`text-xl ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "scale-100 opacity-70"} transition-all`} />
                
                {/* Wishlist Notification Badge */}
                {item.id === "wishlist" && wishlist?.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center bg-red-500 rounded-full border-2 border-white dark:border-black"
                  >
                    <span className="text-[8px] font-black text-white leading-none">
                      {wishlist?.length || 0}
                    </span>
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20 -z-10"></span>
                  </motion.div>
                )}
              </div>

              <span className={`text-[9px] font-bold tracking-tight uppercase ${isActive ? "opacity-100" : "opacity-60"}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavbar;
