import { ReactNode } from "react"
import classes from "./Card.module.css"

type CardProps = {
    children: ReactNode
}

export const Card = ({ children }: CardProps) => {
    return (
        <div className={classes.card}>
            {children}
        </div>
    )
}