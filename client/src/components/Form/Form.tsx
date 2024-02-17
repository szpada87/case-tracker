import { ReactNode } from "react"
import Alert from "../Alert/Alert"
import classes from "./Form.module.css"

type FormProps = {
    children: ReactNode,
    loading?: boolean,
    error?: Error,
    onSubmit: () => void
    // TODO: Add footer to customize with default value as Submit button
}

export const Form = ({ children, loading, error, onSubmit }: FormProps) => {
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <div className='w-full'>
                {error && <Alert title="Error" text={error.message} />}
                {children}
            </div>
            <div className={classes.footer}>
                <button className={classes.submit} disabled={loading} >Submit</button>
            </div>
        </form >
    )
}