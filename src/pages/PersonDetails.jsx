import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPersonDetails, getImageUrl } from "../api/tmdb";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import MovieGrid from "../components/movie/MovieGrid";

const PersonDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    loading: true,
    error: null,
    person: null,
    credits: null,
  });

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { person, credits } = await fetchPersonDetails(id);
        if (!ignore)
          setState({ loading: false, error: null, person, credits });
      } catch (err) {
        if (!ignore)
          setState({ loading: false, error: err, person: null, credits: null });
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (state.loading && !state.person) return <Loader />;
  if (state.error || !state.person)
    return <ErrorState message="Could not load person details." />;

  const { person, credits } = state;

  const knownForMovies =
    credits?.cast?.filter((c) => c.media_type === "movie") || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:flex-row sm:p-6">
        <div className="mx-auto h-44 w-32 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 sm:mx-0 sm:h-56 sm:w-40">
          {person.profile_path ? (
            <img
              src={getImageUrl(person.profile_path, "w342")}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
              No Image
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">
            {person.name}
          </h1>
          {person.known_for_department && (
            <p className="text-xs text-slate-300">
              {person.known_for_department}
            </p>
          )}
          {person.place_of_birth && (
            <p className="text-xs text-slate-400">
              From {person.place_of_birth}
            </p>
          )}
          {person.biography && (
            <p className="mt-2 text-xs text-slate-200 sm:text-sm">
              {person.biography}
            </p>
          )}
        </div>
      </div>

      {knownForMovies.length > 0 && (
        <section className="space-y-3 pb-6">
          <h2 className="text-lg font-semibold text-slate-50">
            Known for
          </h2>
          <MovieGrid movies={knownForMovies.slice(0, 20)} />
        </section>
      )}
    </div>
  );
};

export default PersonDetails;
