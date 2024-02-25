import { useRouteError } from "react-router-dom";
import classes from "./Error.module.css";

type ErrorType = {
  statusText?: string,
  message?: string
}

export default function UnathorizedErrorPage() {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <main id="error-page" className={classes.page_container}>
      <div className={classes.card}>
        <h1 className={classes.title}>Oops!</h1>
        <p className={classes.small}>Sorry, you are unathorized to vew this page.</p>
        <p className={classes.description}>
          Permissions denied
        </p>
      </div>
    </main>
  );
}