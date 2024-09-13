import clsx from "clsx";
import css from "./Avatar.module.css";

export default function Avatar({name}) {
    const getInitials=(name)=> {
        const words=name.split(" ");
        const initials=words.map((word)=> word[0].toUpperCase()).join("");
        return initials.slice(0, 2);
    };

    return (<div className={clsx(css.avatar)}>
        {getInitials(name)}
    </div>
    );
}