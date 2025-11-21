import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import SearchResults from "../components/search/SearchResults";
import Pagination from "../components/ui/Pagination";

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!query.trim()) {
      setState({ loading: false, error: null, data: null });
      return;
    }

    let ignore = false;
    const load = async () => {
      setState({ loading: true, error: null, data: null });
      try {
        const data = await searchMovies(query, page);
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
  }, [query, page]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-50">
        Search results{query ? ` for "${query}"` : ""}
      </h1>

      {state.loading && <Loader />}
      {state.error && <ErrorState message="Failed to load search results." />}
      {state.data && (
        <>
          <SearchResults results={state.data.results} query={query} />
          <Pagination
            page={page}
            totalPages={Math.min(state.data.total_pages, 500)}
            onChange={setPage}
          />
        </>
      )}

      {!query && !state.loading && !state.data && (
        <p className="text-xs text-slate-400">
          Start typing in the search bar to find movies.
        </p>
      )}
    </div>
  );
};

export default Search;
