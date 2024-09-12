import { Link } from "react-router-dom";

import clsx from "clsx";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <>
      <h2 className={clsx(css.text)}>404 - Page Not Found</h2>
      <Link to="/">Go to Home Page</Link>
    </>
  );
}