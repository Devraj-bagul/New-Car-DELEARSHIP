import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isTwoColumnGrid, setIsTwoColumnGrid] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (carId) => {
    setWishlist((prev) => {
      const isRemoving = prev.includes(carId);
      if (isRemoving) {
        toast.info("Removed from Wishlist 💔");
        return prev.filter((id) => id !== carId);
      } else {
        toast.success("Added to Wishlist ❤️", {
          description: "This beauty is now in your collection!",
        });
        return [...prev, carId];
      }
    });
  };

  const isInWishlist = (carId) => wishlist.includes(carId);

  return (
    <AppContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        isTwoColumnGrid,
        setIsTwoColumnGrid,
        showWishlistOnly,
        setShowWishlistOnly,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
