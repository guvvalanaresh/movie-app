import React from "react";

const Pagination = ({ page, totalPages, onChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-200">
      <button
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className={`rounded-full border px-3 py-1 ${
          canPrev
            ? "border-slate-600 hover:border-sky-500"
            : "cursor-not-allowed border-slate-800 text-slate-500"
        }`}
      >
        Prev
      </button>
      <span className="text-slate-400">
        Page <span className="text-slate-100">{page}</span> of{" "}
        <span className="text-slate-100">{totalPages}</span>
      </span>
      <button
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className={`rounded-full border px-3 py-1 ${
          canNext
            ? "border-slate-600 hover:border-sky-500"
            : "cursor-not-allowed border-slate-800 text-slate-500"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
