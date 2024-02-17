import React, { ForwardedRef } from "react";
import classes from "./FormInput.module.css";

export const Input = React.forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) =>
    <input {...props} className={`${classes.field} ${props.className}`} ref={ref} />)