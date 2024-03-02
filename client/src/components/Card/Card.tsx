import { ReactNode } from "react"
import classes from "./Card.module.css"

type CardProps = {
    children: ReactNode,
    className?: string
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`${classes.card} ${className}`}>
            {children}
        </div>
    )
}