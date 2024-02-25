import { useRouteError } from "react-router-dom";
import classes from "./Error.module.css";

type ErrorType = {
  statusText?: string,
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <main id="error-page" className={classes.page_container}>
      <div className={classes.card}>
        <h1 className={classes.title}>Oops!</h1>
        <p className={classes.small}>Sorry, an unexpected error has occurred.</p>
        <p className={classes.description}>
          {error.statusText || error.message}
        </p>
      </div>
    </main>
  );
}