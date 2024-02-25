import React, { ForwardedRef } from "react";
import classes from "./FormInput.module.css";

export const Select = React.forwardRef((props: React.InputHTMLAttributes<HTMLSelectElement>, ref: ForwardedRef<HTMLSelectElement>) =>
    <select {...props} className={`${classes.field} ${props.className}`} ref={ref} />)