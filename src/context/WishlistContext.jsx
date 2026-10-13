import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Wishlist context – global wishlist state persisted to localStorage.
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage("uc-wishlist", []);

  function toggleWishlist(food) {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === food.id);
      return exists ? prev.filter((item) => item.id !== food.id) : [...prev, food];
    });
  }

  function isWished(id) {
    return wishlist.some((item) => item.id === id);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
