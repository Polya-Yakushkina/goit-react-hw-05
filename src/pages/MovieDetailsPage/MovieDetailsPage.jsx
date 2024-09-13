import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaFilm, FaStar  } from "react-icons/fa";
import { getMovieDetails } from "../../tmdb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import toast from 'react-hot-toast';

import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";


export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const backLink = location.state?.from ?? '/movies';
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

    useEffect(() => {
        async function getDetails() {
            try {
                setLoading(true);
                setError(false);
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                toast.error("Sorry, something went wrong... Please try again later!");
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getDetails();
    }, [movieId]);
    
    return (
        <div className={clsx(css.container)}>
            <Link to={backLink} className={clsx(css.backLink)}>
                <TiArrowBackOutline className={clsx(css.goBackIcon)} />
                Go back
            </Link>
            {loading && <Loader />}
            {error && <ErrorMessage />}

            <div className={clsx(css.details)}>
                <div className={clsx(css.poster)}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={clsx(css.img)}
                        />
                    ) : (
                        <FaFilm className={clsx(css.noImg)} />
                    )}
                </div>
                <div className={clsx(css.info)}>
                    <h2 className={clsx(css.title)}>
                        {movie.title} ({releaseYear})
                    </h2>
                    <div className={clsx(css.ratingWrapper)}>
                        <h3 className={clsx(css.subtitle)}>
                            <FaStar className={clsx(css.icon)} style={{ color: 'gold' }} />
                            <div className={clsx(css.ratingWrapper)}>
                                <p className={clsx(css.ratingScore)}>
                                    {movie.vote_average}/10
                                </p>
                                <p className={clsx(css.ratingVote)}>
                                    ({movie.vote_count} votes)
                                </p>
                            </div>
                        </h3>
                    </div>
                    <h3 className={clsx(css.subtitle)}>Overview</h3>
                    <p className={clsx(css.text)}>{movie.overview}</p>
                    <h3 className={clsx(css.subtitle)}>Genres</h3>
                    <ul className={clsx(css.genresList)}>
                        {movie.genres?.map(({ id, name }) => (
                            <li key={id} className={clsx(css.genreItem)}>{name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={clsx(css.additionalInfo)}>
                <h3 className={clsx(css.subtitle)}>Additional information</h3>
                <ul>
                    <li className={clsx(css.text)}>
                        <NavLink to="cast">Cast</NavLink>
                    </li>
                    <li className={clsx(css.text)}>
                        <NavLink to="reviews">Reviews</NavLink>
                    </li>
                </ul>
            </div>

            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    );
}