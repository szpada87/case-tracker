import classes from "./Alert.module.css"

type AlertProps = {
    title: string,
    text: string
}

export default ({ title, text }: AlertProps) => {
    return <div className={classes.alert} role="alert">
        <strong className={classes.title}>{title}</strong>
        <span className={classes.text}>{text}</span>
    </div>
}