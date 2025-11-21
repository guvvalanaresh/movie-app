import React from "react";

const ErrorState = ({ message = "Something went wrong." }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-6 text-center text-sm text-red-200">
      <p>{message}</p>
    </div>
  );
};

export default ErrorState;
