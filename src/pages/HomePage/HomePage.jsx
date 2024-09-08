import clsx from "clsx";
import css from "./HomePage.module.css";

export default function HomePage() {
    return (
        <div className={clsx(css.container)}>
            <h1 className={clsx(css.text)}>Trending today</h1>
        </div>
    )
}