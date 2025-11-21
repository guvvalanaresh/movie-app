import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useWatchlist } from "../../context/WatchlistContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium hover:text-sky-400 ${
      isActive ? "text-sky-400" : "text-slate-200"
    }`;

  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-sky-500 text-xs font-bold text-slate-950">
            🎬
          </span>
          <span className="text-lg font-semibold text-white">MovieVerse</span>
        </button>

        <nav className="hidden items-center gap-4 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/movies/popular" className={navLinkClass}>
            Popular
          </NavLink>
          <NavLink to="/movies/top_rated" className={navLinkClass}>
            Top Rated
          </NavLink>
          <NavLink to="/movies/now_playing" className={navLinkClass}>
            Now Playing
          </NavLink>
          <NavLink to="/watchlist" className={navLinkClass}>
            Watchlist
            {watchlist.length > 0 && (
              <span className="ml-1 rounded bg-sky-500/10 px-1.5 text-[10px] text-sky-400">
                {watchlist.length}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden w-64 md:block">
            <SearchBar />
          </div>
          <Link
            to="/watchlist"
            className="flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-sky-500 hover:text-sky-400"
          >
            ⭐ Watchlist
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="block border-t border-slate-800 px-4 py-2 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;
