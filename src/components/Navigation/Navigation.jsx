import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation () {
    return (
        <ul className={clsx(css.list)}>
            <li className={clsx(css.item)}>Home</li>
            <li>Movies</li>
        </ul>
    );
}