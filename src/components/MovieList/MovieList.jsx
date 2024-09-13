import { Link, useLocation } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

import clsx from "clsx";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={clsx(css.list)}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={clsx(css.item)}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={clsx(css.link)}
          >
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={title}
                className={clsx(css.img)}
              />
            ) : (
              <FaFilm className={clsx(css.noImg)} />
            )}
            <p className={clsx(css.text)}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}