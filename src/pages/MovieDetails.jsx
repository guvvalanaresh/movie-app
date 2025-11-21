import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../api/tmdb";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import CastCard from "../components/movie/CastCard";
import MovieGrid from "../components/movie/MovieGrid";
import RatingBadge from "../components/movie/RatingBadge";
import { useWatchlist } from "../context/WatchlistContext";

const MovieDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    loading: true,
    error: null,
    details: null,
    credits: null,
    videos: [],
    similar: [],
  });
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlist();

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { details, credits, videos, similar } = await fetchMovieDetails(
          id
        );
        if (!ignore)
          setState({
            loading: false,
            error: null,
            details,
            credits,
            videos,
            similar,
          });
      } catch (err) {
        if (!ignore)
          setState({
            loading: false,
            error: err,
            details: null,
            credits: null,
            videos: [],
            similar: [],
          });
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (state.loading && !state.details) return <Loader />;
  if (state.error || !state.details)
    return <ErrorState message="Could not load movie details." />;

  const { details, credits, videos, similar } = state;
  const heroImage =
    details.backdrop_path || details.poster_path
      ? getImageUrl(details.backdrop_path || details.poster_path, "w1280")
      : null;

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const inWatchlist = isInWatchlist(details.id);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
        {heroImage && (
          <div className="relative h-56 w-full sm:h-72">
            <img
              src={heroImage}
              alt={details.title}
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>
        )}

        <div className="grid gap-4 p-4 sm:grid-cols-[auto,1fr] sm:p-6">
          <div className="relative mx-auto h-44 w-32 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 sm:mx-0 sm:h-56 sm:w-40">
            {details.poster_path ? (
              <img
                src={getImageUrl(details.poster_path, "w342")}
                alt={details.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                No Poster
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                {details.title}
              </h1>
              <RatingBadge rating={details.vote_average} />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              {details.release_date && (
                <span>
                  {new Date(details.release_date).toLocaleDateString()}
                </span>
              )}
              {details.runtime && <span>{details.runtime} min</span>}
              {details.genres && details.genres.length > 0 && (
                <span>
                  {details.genres.map((g) => g.name).join(" • ")}
                </span>
              )}
            </div>

            {details.overview && (
              <p className="text-xs text-slate-200 sm:text-sm">
                {details.overview}
              </p>
            )}

            <button
              onClick={() =>
                inWatchlist
                  ? removeFromWatchlist(details.id)
                  : addToWatchlist(details)
              }
              className={`mt-2 inline-flex w-max items-center rounded-full px-4 py-2 text-xs font-medium transition ${
                inWatchlist
                  ? "bg-yellow-400 text-slate-950 hover:bg-yellow-300"
                  : "bg-sky-500 text-slate-950 hover:bg-sky-400"
              }`}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">Trailer</h2>
          <div className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={details.title}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Cast */}
      {credits?.cast && credits.cast.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">Cast</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {credits.cast.slice(0, 10).map((person) => (
              <CastCard key={person.cast_id || person.id} person={person} />
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {similar && similar.length > 0 && (
        <section className="space-y-3 pb-6">
          <h2 className="text-lg font-semibold text-slate-50">
            You might also like
          </h2>
          <MovieGrid movies={similar.slice(0, 10)} />
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
