import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";
import RatingBadge from "./RatingBadge";
import { useWatchlist } from "../../context/WatchlistContext";

const MovieCard = ({ movie, showWatchlist = true }) => {
  const { id, title, name, poster_path, vote_average, release_date } = movie;
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inList = isInWatchlist(id);
  const img = getImageUrl(poster_path);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm transition hover:border-sky-500/70 hover:shadow-lg hover:shadow-sky-900/40">
      <Link to={`/movie/${id}`} className="relative block aspect-[2/3]">
        {img ? (
          <img
            src={img}
            alt={title || name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
        <div className="absolute left-2 top-2">
          <RatingBadge rating={vote_average} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 px-3 py-3">
        <Link
          to={`/movie/${id}`}
          className="line-clamp-2 text-sm font-medium text-slate-50 hover:text-sky-400"
        >
          {title || name}
        </Link>
        {release_date && (
          <p className="text-[11px] text-slate-400">
            {new Date(release_date).getFullYear()}
          </p>
        )}

        {showWatchlist && (
          <button
            onClick={() =>
              inList ? removeFromWatchlist(id) : addToWatchlist(movie)
            }
            className={`mt-auto inline-flex items-center justify-center rounded-full border px-2 py-1 text-[11px] font-medium transition ${
              inList
                ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400/20"
                : "border-slate-700 bg-slate-900 text-slate-100 hover:border-sky-500/60 hover:text-sky-400"
            }`}
          >
            {inList ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;