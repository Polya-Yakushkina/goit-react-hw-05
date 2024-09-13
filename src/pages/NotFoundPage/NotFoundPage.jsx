import { Link } from "react-router-dom";

import clsx from "clsx";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={clsx(css.container)}>
      <h2 className={clsx(css.text)}>404 - Page Not Found</h2>
      <Link to="/" className={clsx(css.link)}>Go to Home Page</Link>
    </div>
  );
}