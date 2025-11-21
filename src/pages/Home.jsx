import React, { useEffect, useState } from "react";
import { fetchTrending, fetchMoviesByType } from "../api/tmdb";
import MovieGrid from "../components/movie/MovieGrid";
import MovieSkeleton from "../components/movie/MovieSkeleton";
import Loader from "../components/ui/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const [trend, pop, now, top] = await Promise.all([
          fetchTrending(),
          fetchMoviesByType("popular"),
          fetchMoviesByType("now_playing"),
          fetchMoviesByType("top_rated"),
        ]);

        if (!ignore) {
          setTrending(trend.slice(0, 10));
          setPopular(pop.results.slice(0, 10));
          setNowPlaying(now.results.slice(0, 10));
          setTopRated(top.results.slice(0, 10));
        }
      } catch {
        // ignore for now
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const hero = trending[0];

  return (
    <div className="space-y-8">
      {/* Hero */}
      {hero && (
        <Link
          to={`/movie/${hero.id}`}
          className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
        >
          <div className="grid gap-4 p-4 sm:grid-cols-[3fr,2fr] sm:p-6">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-800">
              <img
                src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
                alt={hero.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-sky-400">
                Featured
              </p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                {hero.title}
              </h1>
              <p className="line-clamp-3 text-xs text-slate-300 sm:text-sm">
                {hero.overview}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                {hero.release_date && (
                  <span>
                    {new Date(hero.release_date).toLocaleDateString()}
                  </span>
                )}
                {hero.vote_average && (
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-yellow-300">
                    ⭐ {hero.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              <button className="mt-2 inline-flex w-max items-center rounded-full bg-sky-500 px-4 py-2 text-xs font-medium text-slate-950 transition hover:bg-sky-400">
                View details
              </button>
            </div>
          </div>
        </Link>
      )}

      {/* Sections */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-50">
            Trending This Week
          </h2>
          <Link
            to="/category/trending"
            className="text-xs text-sky-400 hover:underline"
          >
            View all
          </Link>
        </div>
        {loading && trending.length === 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        ) : (
          <MovieGrid movies={trending} />
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-50">Popular</h2>
          <Link
            to="/movies/popular"
            className="text-xs text-sky-400 hover:underline"
          >
            View all
          </Link>
        </div>
        {loading && popular.length === 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        ) : (
          <MovieGrid movies={popular} />
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-50">Now Playing</h2>
          <Link
            to="/movies/now_playing"
            className="text-xs text-sky-400 hover:underline"
          >
            View all
          </Link>
        </div>
        {loading && nowPlaying.length === 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        ) : (
          <MovieGrid movies={nowPlaying} />
        )}
      </section>

      <section className="space-y-3 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-50">Top Rated</h2>
          <Link
            to="/movies/top_rated"
            className="text-xs text-sky-400 hover:underline"
          >
            View all
          </Link>
        </div>
        {loading && topRated.length === 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        ) : (
          <MovieGrid movies={topRated} />
        )}
      </section>
    </div>
  );
};

export default Home;
