import React from "react";

const EmptyState = ({ title = "No results", subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-10 text-center">
      <p className="text-sm font-medium text-slate-100">{title}</p>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 max-w-sm">{subtitle}</p>
      )}
    </div>
  );
};

export default EmptyState;
