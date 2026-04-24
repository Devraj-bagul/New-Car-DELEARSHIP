import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiHeart } from "react-icons/hi";
import { MdFingerprint } from "react-icons/md";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileNavbar from "./MobileNavbar";
import { useAppContext } from "../Shared/AppContext";

const Header = () => {
  const { isSignedIn } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlist, showWishlistOnly, setShowWishlistOnly } = useAppContext();

  const handleWishlistClick = () => {
    if (location.pathname !== "/" && !location.pathname.startsWith("/search")) {
      navigate("/search");
    }
    setShowWishlistOnly(!showWishlistOnly);
  };

  const isActive = (path) => {
    // Exact match or sub-path match for inventory
    if (path === "/" && location.pathname !== "/") return false;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // WhatsApp Message
  const whatsappMessage = encodeURIComponent(
    "Hello Vinit Cars, mujhe ek car ke baare mein information chahiye."
  );

  // Universal Maps Link
  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=Vinit+Auto+Car+Mall+Malegaon";

  const handleSubmitClick = () => {
    if (!isSignedIn) navigate("/sign-in");
    else navigate("/profile");
  };

  return (
    <>
      {/* GLOBAL BACK BUTTON - MINIMAL ICON */}
      {location.pathname !== "/" && !location.pathname.startsWith("/listing-details") && (
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="fixed top-24 sm:top-32 left-4 sm:left-6 z-[70] flex md:hidden items-center justify-center bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-gold/30 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:border-gold hover:text-gold shadow-[0_0_15px_rgba(0,0,0,0.5)] group pointer-events-auto active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      )}

      <div className="fixed top-0 w-full z-50 flex justify-center mt-4 px-2 sm:px-6 pointer-events-none">
        {/* FLOATING GLASS PILL CONTAINER */}
      <div 
        className={`pointer-events-auto w-full max-w-[98%] sm:max-w-[95%] rounded-full transition-all duration-300 flex justify-between items-center px-4 sm:px-8 lg:px-12 ${
          isScrolled 
            ? "bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-black/10 dark:border-gold/40 shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] py-2 sm:py-4" 
            : "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg py-2.5 sm:py-6"
        }`}
      >
        
        {/* LOGO */}
        <Link to="/" className="flex flex-1 lg:flex-none items-center justify-center lg:justify-start gap-2 sm:gap-4 group lg:translate-x-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gold flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gold rounded-full"></div>
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-['Playfair_Display',_serif] font-bold tracking-widest text-gold dark:text-gold italic drop-shadow-sm">
            VINIT CARS
          </h1>
        </Link>
        
        {/* MOBILE WISHLIST TOGGLE */}
        <div className="flex lg:hidden items-center">
            <motion.button
              onClick={handleWishlistClick}
              whileTap={{ scale: 0.9 }}
              className={`relative p-1.5 rounded-full transition-all ${showWishlistOnly ? 'text-red-500 bg-red-500/10' : 'text-red-500'}`}
            >
              <HiHeart className={`text-xl ${showWishlistOnly ? 'fill-current' : ''}`} />
              {wishlist?.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0 -right-0 flex h-4 w-4 items-center justify-center bg-red-500 rounded-full border-2 border-white dark:border-black"
                >
                  <span className="text-[8px] font-black text-white leading-none">
                    {wishlist?.length || 0}
                  </span>
                </motion.div>
              )}
            </motion.button>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-10 xl:gap-14 items-center text-base font-medium tracking-wider">
          
          <Link to="/">
            <li className={`relative cursor-pointer transition-colors duration-300 font-medium ${isActive('/') ? 'text-gold' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}>
              Home
              {isActive('/') && <span className="absolute left-0 -bottom-[6px] w-[60%] h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>}
            </li>
          </Link>

          <Link to="/search">
            <li className={`relative cursor-pointer transition-colors duration-300 font-medium ${isActive('/search') ? 'text-gold' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}>
              Inventory
              {isActive('/search') && <span className="absolute left-0 -bottom-[6px] w-[60%] h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>}
            </li>
          </Link>

          <Link to="/global-showroom">
            <li className={`relative cursor-pointer transition-colors duration-300 font-medium flex items-center gap-1.5 ${isActive('/global-showroom') ? 'text-gold' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}>
              Showroom <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              {isActive('/global-showroom') && <span className="absolute left-0 -bottom-[6px] w-[60%] h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>}
            </li>
          </Link>

          <Link to="/contact">
            <li className={`relative cursor-pointer transition-colors duration-300 font-medium ${isActive('/contact') ? 'text-gold' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}>
              Contact
              {isActive('/contact') && <span className="absolute left-0 -bottom-[6px] w-[60%] h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>}
            </li>
          </Link>

          {/* LOCATION GOOGLE MAPS BUTTON */}
          <a href={mapsLink} target="_blank" rel="noopener noreferrer">
            <li className="cursor-pointer transition-all duration-300 font-medium bg-gold/10 border border-gold/30 text-gold px-5 py-1.5 rounded-full hover:bg-gold/20 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Location
            </li>
          </a>
        </ul>

        {/* DESKTOP SUBMIT BUTTON & PROFILE */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Theme Toggle Removed */}
          {isSignedIn ? (
            <div className="flex items-center gap-5">
              <Link to="/profile">
                <Button className="hidden md:flex gap-2 bg-foreground text-background dark:bg-gold dark:text-black hover:bg-gold hover:text-black border border-transparent hover:border-gold transition-all duration-300 font-semibold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  Submit Listing
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button 
                className="flex items-center gap-2 text-gold group transition-all"
                title="Admin Login"
              >
              </button>
            </div>
          )}
        </div>

      </div>
      </div>


      {/* MOBILE DRAWER */}
      {openMenu && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-midnight/95 backdrop-blur-xl border-l border-gold/20 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] p-8 z-[100] transform transition-transform overflow-y-auto">
          <HiX
            className="text-3xl cursor-pointer absolute top-6 right-6 text-gold hover:text-white transition"
            onClick={() => setOpenMenu(false)}
          />

          <ul className="flex flex-col gap-8 mt-20 text-lg font-light tracking-wider">

            {/* HOME MOBILE */}
            <Link to="/" onClick={() => setOpenMenu(false)}>
              <li className="cursor-pointer text-foreground hover:text-gold transition">Home</li>
            </Link>

            <Link to="/search" onClick={() => setOpenMenu(false)}>
              <li className="cursor-pointer text-foreground hover:text-gold transition">Inventory</li>
            </Link>
            <Link to="/global-showroom" onClick={() => setOpenMenu(false)}>
              <li className="cursor-pointer text-foreground hover:text-gold transition flex items-center gap-2">
                Showroom <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              </li>
            </Link>

            {/* CALL MOBILE */}
            <Link to="/contact" onClick={() => setOpenMenu(false)}>
              <li className="cursor-pointer text-foreground hover:text-gold transition">
                Contact
              </li>
            </Link>

            {/* LOCATION MOBILE */}
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" onClick={() => setOpenMenu(false)}>
              <li className="cursor-pointer text-gold border border-gold/30 rounded-full px-4 py-2 hover:bg-gold/10 transition inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location
              </li>
            </a>

            {/* <button className="flex justify-center items-center gap-3 mt-4 text-gold/80 hover:text-gold transition w-full py-2 border border-gold/20 rounded-md">
               <MdFingerprint className="text-xl" /> Admin Login
            </button> */}
          </ul>
        </div>
      )}
      
      {/* MOBILE BOTTOM NAVBAR */}
      <MobileNavbar />
    </>
  );
};

export default Header;
