import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-gold/5 animate-pulse"></div>;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full flex items-center p-1 transition-colors duration-300 ${isDark ? "bg-gold/20 border border-gold/40" : "bg-gray-200 border border-gray-300"}`}
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        layout
        initial={false}
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`w-6 h-6 rounded-full flex justify-center items-center shadow-md ${isDark ? "bg-gold text-midnight" : "bg-white text-gray-700"}`}
      >
        {isDark ? <HiMoon size={14} /> : <HiSun size={14} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
