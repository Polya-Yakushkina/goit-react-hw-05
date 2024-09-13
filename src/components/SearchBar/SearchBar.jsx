import clsx from "clsx";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
    const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target.elements.query.value.trim();
        onSearch(query);

    e.target.reset();
  };
    
    return (
        <form onSubmit={handleSubmit} className={clsx(css.form)}>
            <input
                className={clsx(css.input)}
                type="text"
                name="query"
            />
            <button type="submit" className={clsx(css.btn)}>Search</button>
        </form>
    );
}