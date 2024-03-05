import React, { ForwardedRef } from "react";
import classes from "./FormInput.module.css";

export const TextArea = React.forwardRef((props: React.InputHTMLAttributes<HTMLTextAreaElement>, ref: ForwardedRef<HTMLTextAreaElement>) =>
    <textarea {...props} className={`${classes.field} ${props.className}`} ref={ref} />)