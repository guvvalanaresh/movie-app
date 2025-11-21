import React from "react";
import MovieGrid from "../movie/MovieGrid";
import EmptyState from "../ui/EmptyState";

const SearchResults = ({ results, query }) => {
  if (!results || results.length === 0) {
    return (
      <EmptyState
        title="No movies found"
        subtitle={
          query
            ? `We couldn't find any results for "${query}". Try another title.`
            : "Start typing to search for movies."
        }
      />
    );
  }

  return <MovieGrid movies={results} />;
};

export default SearchResults;
