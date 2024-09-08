import clsx from "clsx";
import css from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, onSearch }) {
    const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target.elements.query.value;
    onSearch(query.trim());

    e.target.reset();
  };
    
    return (
        <form onSubmit={handleSubmit} className={clsx(css.form)}>
            <input
                className={clsx(css.input)}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}