import React from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieGrid from "../components/movie/MovieGrid";
import EmptyState from "../components/ui/EmptyState";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-50">Watchlist</h1>

      {watchlist.length === 0 ? (
        <EmptyState
          title="Your watchlist is empty"
          subtitle="Add movies to your watchlist to keep track of what you want to watch later."
        />
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  );
};

export default Watchlist;
