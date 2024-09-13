import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../tmdb-api";
import Avatar from "../Avatar/Avatar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";

import clsx from "clsx";
import css from "./MovieCast.module.css";

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const castRef = useRef(null);

    useEffect(() => {
        async function getCast() {
            try {
                setLoading(true);
                setError(false);
                const data = await getMovieCredits(movieId);
                console.log('Data from getMovieCredits:', data);
                if (data.length === 0) {
                    toast.error("Sorry, there are no cast members found");
                }
                setCast(data);
            } catch (error) {
                toast.error("Oops, something went wrong... Please try again later!");
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getCast();
    }, [movieId]);

    useEffect(() => {
        if (cast.length > 0) {
            castRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [cast]);
    
    return (
        <div className={clsx(css.container)}>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            <div ref={castRef}>
                {cast.length > 0 && (
                    <ul className={clsx(css.list)}>
                        {cast.map((actor) => (
                            <li key={actor.id} className={clsx(css.item)}>
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                        className={clsx(css.img)}
                                    />
                                ) : (
                                    <Avatar name={actor.name} className={clsx(css.avatar)} />
                                )}
                                <p className={clsx(css.text)}>{actor.name}</p>
                                {actor.character && (
                                    <p className={clsx(css.character)}>Character: {actor.character}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}