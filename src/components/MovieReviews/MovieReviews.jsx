import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../tmdb-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import { format, parseISO } from 'date-fns';

import clsx from "clsx";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const ReviewRef = useRef(null);

    useEffect(() => {
        async function getReviews() {
            try {
                setLoading(true);
                setError(false);
                const data = await getMovieReviews(movieId);
                console.log('Data from getMovieReviews:', data);
                if (data.length === 0) {
                    toast.error("Sorry, there are no reviews found");
                }
                const reviewDate = data.map(review => ({
                    ...review,
                    formattedDate: format(parseISO(review.updated_at), 'dd-MM-yyyy'),
                }));

                setReviews(reviewDate);
            } catch (error) {
                toast.error("Oops, something went wrong... Please try again later!");
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getReviews();
    }, [movieId]);

    useEffect(() => {
        if (reviews.length > 0) {
            ReviewRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [reviews]);
    
    return (
        <div className={clsx(css.container)}>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            <div ref={ReviewRef}>
                {reviews.length > 0 && (
                    <ul className={clsx(css.list)}>
                        {reviews.map((review) => (
                            <li key={review.id} className={clsx(css.item)}>
                                <p className={clsx(css.author)}>Author: {review.author}</p>
                                <p className={clsx(css.date)}>Date: {review.formattedDate}</p>
                                <p className={clsx(css.text)}>{review.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}