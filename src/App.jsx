import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import Category from "./pages/Category";
import PersonDetails from "./pages/PersonDetails";
import Watchlist from "./pages/Watchlist";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Generic movie list by type: popular, top_rated, now_playing, upcoming */}
        <Route path="/movies/:type" element={<MovieList />} />

        {/* Category alias */}
        <Route path="/category/:type" element={<Category />} />

        {/* Movie details */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Person / actor details */}
        <Route path="/person/:id" element={<PersonDetails />} />

        {/* Search */}
        <Route path="/search" element={<Search />} />

        {/* Watchlist */}
        <Route path="/watchlist" element={<Watchlist />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
