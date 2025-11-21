import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";

const CastCard = ({ person }) => {
  const img = getImageUrl(person.profile_path, "w185");

  return (
    <Link
      to={`/person/${person.id}`}
      className="flex flex-col items-center gap-2 rounded-lg bg-slate-900/60 p-3 text-center text-xs text-slate-200 transition hover:border-sky-500 hover:bg-slate-900"
    >
      <div className="h-20 w-20 overflow-hidden rounded-full border border-slate-700 bg-slate-800">
        {img ? (
          <img
            src={img}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-500">
            No Image
          </div>
        )}
      </div>
      <div>
        <p className="line-clamp-1 font-medium">{person.name}</p>
        {person.character && (
          <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400">
            as {person.character}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CastCard;
