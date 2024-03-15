import { ReactNode } from "react"
import Alert from "../../common/Alert/Alert"
import classes from "./Form.module.css"
import { Button } from "../../common/Button/Button"

type FormProps = {
    children: ReactNode,
    loading?: boolean,
    error?: Error,
    onSubmit: () => void
    // TODO: Add footer to customize with default value as Submit button
}

export const Form = ({ children, loading, error, onSubmit }: FormProps) => {
    return (
        <form className={classes.form} onSubmit={(e) =>{
            e.preventDefault();
            onSubmit();
        }}>
            <div className='w-full'>
                {error && <Alert title="Error" text={error.message} />}
                {children}
            </div>
            <div className={classes.footer}>
                <Button type="submit" disabled={loading} >Submit</Button>
            </div>
        </form >
    )
}