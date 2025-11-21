import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = params.get("q") || "";
  const [query, setQuery] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const clear = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200"
    >
      <FiSearch className="h-4 w-4 text-slate-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 bg-transparent text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={clear}
          className="text-slate-500 hover:text-slate-300"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;