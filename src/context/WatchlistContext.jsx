import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const WatchlistContext = createContext(null);

const STORAGE_KEY = "movie_app_watchlist";

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const isFirstLoad = useRef(true);

// Fixed the localstorage watchlist issue

  // Load from localStorage ONLY once
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  // Save to localStorage only AFTER the initial load
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
