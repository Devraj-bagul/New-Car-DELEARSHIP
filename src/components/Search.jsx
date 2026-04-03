import React, { useState, useEffect, useRef } from "react";
import { TbSettingsSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./../../configs";
import { CarListing } from "./../../configs/schema";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [query, setQuery] = useState("");
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    GetSuggestions();
    
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const GetSuggestions = async () => {
    try {
      const result = await db.select({
        title: CarListing.listingTitle,
        make: CarListing.make,
        model: CarListing.model
      }).from(CarListing);
      
      // Extract unique names, brands, and models
      const suggestions = new Set();
      result.forEach(item => {
        if (item.title) suggestions.add(item.title);
        if (item.make) suggestions.add(item.make);
        // if (item.model) suggestions.add(item.model); // Optional: add models too
      });
      
      setAllSuggestions(Array.from(suggestions));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = allSuggestions
        .filter(item => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8); // Limit to top 8 suggestions
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex flex-col md:flex-row w-full gap-2 p-2 relative z-50">
        
        {/* Search Input */}
        <div className="flex-1 flex items-center px-4">
          <input 
            type="text" 
            placeholder="Type car name or brand (e.g. Creta, Swift, Hyundai...)" 
            className="w-full bg-transparent border-none text-foreground text-md md:text-lg focus:outline-none py-3 placeholder-foreground/40 font-medium"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Search Button */}
        <div className="md:w-auto">
          <button
            onClick={handleSearch}
            className="
              w-full md:w-auto bg-gold text-midnight px-12 py-3.5 rounded-[12px]
              font-extrabold text-lg hover:bg-yellow-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
              transition-all duration-300 flex items-center justify-center gap-3
              active:scale-95
            "
          >
            <TbSettingsSearch className="text-2xl" />
            <span>Search Inventory</span>
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 bg-card/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl z-[100] overflow-hidden p-1"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full text-left px-5 py-3.5 hover:bg-gold/10 text-foreground transition-all duration-200 flex items-center gap-3 rounded-xl group"
              >
                <TbSettingsSearch className="text-gold opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <span className="font-medium">{suggestion}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
