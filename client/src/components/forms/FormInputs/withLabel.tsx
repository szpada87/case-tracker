import React from 'react';
import { FieldError } from 'react-hook-form';
import classes from "./FormInput.module.css";

interface WithLabelProps {
    label: string,
    error?: FieldError,
    className?: string,
    name: string
}

const withLabel = <P extends object>(Component: React.ComponentType<P>) => {
    return React.forwardRef((props: P & WithLabelProps, ref) => {
        const { label, error, className, name, ...subProps } = props;
        return <div className={classes.field_container} >
            <label htmlFor={name} className={classes.field_label}>{label}</label>
            <Component id={name} {...subProps as P} className={ `${className || ''} ${error && classes.invalid}`} name={name} placeholder='' ref={ref} />
            {error && <div className={classes.field_error}>{error.message}</div>}
        </div>;
    })
}


export default withLabel