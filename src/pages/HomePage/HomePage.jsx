import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../tmdb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";


import clsx from "clsx";
import css from "./HomePage.module.css";

export default function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMovies() {
            try {
                setLoading(true);
                setError(false);
                const data = await getTrendingMovies();
                setTrendingMovies(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    getMovies();
  }, []);

    return (
        <div className={clsx(css.container)}>
            <h2 className={clsx(css.text)}>Trending today</h2>
            {error && <ErrorMessage />}
            {loading && <Loader />}
            {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
        </div>
    )
}