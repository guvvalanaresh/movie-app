import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // set in .env
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getImageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const fetchTrending = async () => {
  const res = await tmdb.get("/trending/movie/week");
  return res.data.results;
};

export const fetchMoviesByType = async (type = "popular", page = 1) => {
  const res = await tmdb.get(`/movie/${type}`, { params: { page } });
  return res.data;
};

export const fetchMovieDetails = async (id) => {
  const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
    tmdb.get(`/movie/${id}`),
    tmdb.get(`/movie/${id}/credits`),
    tmdb.get(`/movie/${id}/videos`),
    tmdb.get(`/movie/${id}/similar`),
  ]);

  return {
    details: detailsRes.data,
    credits: creditsRes.data,
    videos: videosRes.data.results,
    similar: similarRes.data.results,
  };
};

export const searchMovies = async (query, page = 1) => {
  const res = await tmdb.get("/search/movie", {
    params: { query, page, include_adult: false },
  });
  return res.data;
};

export const fetchMoviesByCategory = async (category, page = 1) => {
  // category like 'trending', 'upcoming', etc.
  if (category === "trending") {
    const res = await tmdb.get("/trending/movie/week", { params: { page } });
    return { ...res.data, results: res.data.results };
  }
  if (category === "upcoming") {
    const res = await tmdb.get("/movie/upcoming", { params: { page } });
    return res.data;
  }

  // fallback to type route
  return fetchMoviesByType(category, page);
};

export const fetchPersonDetails = async (id) => {
  const [personRes, creditsRes] = await Promise.all([
    tmdb.get(`/person/${id}`),
    tmdb.get(`/person/${id}/combined_credits`),
  ]);

  return {
    person: personRes.data,
    credits: creditsRes.data,
  };
};
