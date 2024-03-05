import { useRouteError } from "react-router-dom";
import { FaBug } from 'react-icons/fa';
import classes from "./Error.module.css";
import { Card } from "../../components/common/Card/Card";

type ErrorType = {
  statusText?: string,
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <main id="error-page" className={classes.page_container}>
      <Card className={classes.card}>
        <FaBug className={classes.icon} size="56" />
        <h1 className={classes.title}>Oops!</h1>
        <p className={classes.small}>Sorry, an unexpected error has occurred.</p>
        <p className={classes.description}>
          {error.statusText || error.message}
        </p>
      </Card>
    </main>
  );
}