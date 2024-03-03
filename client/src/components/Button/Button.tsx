import { ReactNode } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
    children: ReactNode,
    primary?: boolean,
    onClick?: () => void,
    disabled?: boolean
}

export const Button = ({ children, primary = true, onClick, disabled=false }: ButtonProps) => {
    return <button className={`${classes.btn} ${primary && classes.primary}`} disabled={disabled} onClick={onClick} >
        {children}
    </button>
}