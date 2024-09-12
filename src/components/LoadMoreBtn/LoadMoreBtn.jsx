import clsx from "clsx";
// import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
    return (
        <div>
            <button
                type="button"
                onClick={onClick}
                // className={clsx(css.btn)}
            >
                Load more
            </button>
        </div>
    );
}