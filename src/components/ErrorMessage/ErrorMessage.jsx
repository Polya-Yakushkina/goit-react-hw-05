import clsx from "clsx";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
    return (
        <div className={clsx(css.container)}>
            <p className={clsx(css.text)}>
                Sorry, something went wrong... Please try again later!
            </p>
        </div>
    );
}