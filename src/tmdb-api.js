import axios from "axios";

const myAccessKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDEwNTk3YTA3NTIwYjBjMTU5ODI3OGZjMGZmOTliNiIsIm5iZiI6MTcyNTY2MzU2OC4wMDAxODksInN1YiI6IjY2ZGI4NTUwNTRhZjBlMTcwZTM4N2JjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6r_XN6Megs6QPOqAvV-LAMQA9gLqQkFQCcoSJTxPV_M";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${myAccessKey}`;
axios.defaults.headers.common["Content-Type"] = "application/json";


export const searchMovies = async (query, page) => {
  const response = await axios.get(`/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
      per_page: 20,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day`);
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};