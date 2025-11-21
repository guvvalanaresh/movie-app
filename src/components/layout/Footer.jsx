import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} MovieVerse. Built for learning.</p>
        <p>
          Powered by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            TMDB
          </a>{" "}
          (unofficial)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
