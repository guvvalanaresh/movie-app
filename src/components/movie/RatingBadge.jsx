import React from "react";
import { FaStar } from "react-icons/fa";

const RatingBadge = ({ rating }) => {
  if (rating == null) return null;

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-yellow-400">
      <FaStar className="h-3 w-3" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingBadge;
