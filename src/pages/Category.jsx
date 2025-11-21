import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByCategory } from "../api/tmdb";
import MovieGrid from "../components/movie/MovieGrid";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import Pagination from "../components/ui/Pagination";

const labelMap = {
  trending: "Trending Movies",
  upcoming: "Upcoming Movies",
};

const Category = () => {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetchMoviesByCategory(type, page);
        if (!ignore) setState({ loading: false, error: null, data });
      } catch (err) {
        if (!ignore)
          setState({ loading: false, error: err, data: null });
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [type, page]);

  const title = labelMap[type] || "Movies";

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-50">{title}</h1>
      {state.loading && !state.data && <Loader />}
      {state.error && <ErrorState message="Failed to load category." />}
      {state.data && <MovieGrid movies={state.data.results} />}
      {state.data && (
        <Pagination
          page={page}
          totalPages={Math.min(state.data.total_pages, 500)}
          onChange={setPage}
        />
      )}
    </div>
  );
};

export default Category;
