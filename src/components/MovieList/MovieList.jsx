import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";
import css from "./MovieList.module.css";


export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={clsx(css.list)}>
      {movies.map(movie => (
        <li key={movie.id} className={clsx(css.item)}>
              <Link
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}>
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}