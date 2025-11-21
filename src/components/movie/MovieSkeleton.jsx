import React from "react";

const MovieSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="aspect-[2/3] animate-pulse bg-slate-800" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-800" />
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-slate-800" />
      </div>
    </div>
  );
};

export default MovieSkeleton;
