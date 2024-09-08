import clsx from "clsx";
import css from "./MoviesPage.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function MoviesPage() {
    return (
        <div className={clsx(css.container)}>
            <SearchBar onSearch={handleSearch} />
        </div>
    )
}