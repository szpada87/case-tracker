import { ReactNode } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
    children: ReactNode,
    primary?: boolean,
    onClick?: () => void,
    disabled?: boolean,
    type?: "button" | "submit"
}

export const Button = ({ children, primary = true, onClick, disabled=false, type="button" }: ButtonProps) => {
    return <button type={type} className={`${classes.btn} ${primary && classes.primary}`} disabled={disabled} onClick={onClick} >
        {children}
    </button>
}