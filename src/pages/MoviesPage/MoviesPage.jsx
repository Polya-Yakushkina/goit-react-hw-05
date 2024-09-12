import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../tmdb-api";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
// import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import clsx from "clsx";
import css from "./MoviesPage.module.css";


export default function MoviesPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(999);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const page = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        if (query === "") {
            toast.error("Please enter movie title");
            return;
        }
        async function getMovies() {
            try {
                setLoading(true);
                setError(false);
                const data = await searchMovies(query, page);
                if (data.results.length === 0) {
                    toast.error("No movies found");
                } else {
                    setMovies(prevMovies => [...prevMovies, ...data.results]);
                    setTotalPages(data.total_pages);
                }
            } catch (error) {
                toast.error("Sorry, something went wrong... Please try again later!");
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getMovies();
    }, [query, page]);


    useEffect(() => {
        if (movies.length > 0) {
            setTimeout(() => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                });
            }, 500);
        }
    }, [movies]);


    const handleSearch = (newQuery) => {
        setSearchParams({ query: newQuery, page: 1 });
        setMovies([]);
    };
    
    // const handleLoadMore = () => {
    //     const newParams = new URLSearchParams(searchParams);
    //     const currentPage = Number(newParams.get("page")) || 1;
    //     newParams.set("page", currentPage + 1);
    //     setSearchParams(newParams);
    // };
    

    return (
        <div className={clsx(css.container)}>
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {movies.length > 0 && <MovieList movies={movies} />}
            {/* {movies.length > 0 && !loading && !error && page < totalPages && (
                <LoadMoreBtn onClick={handleLoadMore} />
            )} */}
            <Toaster />
        </div>
    );
}



    


