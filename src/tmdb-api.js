import axios from "axios";

const myAccessKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDEwNTk3YTA3NTIwYjBjMTU5ODI3OGZjMGZmOTliNiIsIm5iZiI6MTcyNTY2MzU2OC4wMDAxODksInN1YiI6IjY2ZGI4NTUwNTRhZjBlMTcwZTM4N2JjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6r_XN6Megs6QPOqAvV-LAMQA9gLqQkFQCcoSJTxPV_M";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${myAccessKey}`;
axios.defaults.headers.common["Content-Type"] = "application/json";


export const searchMovies = async (query, page) => {
  try {
    const response = await axios.get(`/search/movie`, {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
    });

    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching search movies:", error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`/trending/movie/day`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ${movieId}:`, error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ${movieId}:`, error);
    throw error;
  }
};