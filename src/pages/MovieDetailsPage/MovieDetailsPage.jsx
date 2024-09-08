import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
     const backLinkHref = location.state ?? '/products';

    return (
        <div className={clsx(css.container)}>
            <BackLink to={backLinkHref}>Back to products</BackLink>
            <h1 className={clsx(css.text)}>Trending today</h1>
        </div>
    )
}