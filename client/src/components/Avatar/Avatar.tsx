import classes from "./Avatar.module.css";

type AvatarProps = {
    owner: string
}

export const Avatar = ({ owner }: AvatarProps) => {
    return (
        <div className={classes.avatar_wrapper}>
            <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${owner}`} alt='' className={classes.avatar} />
        </div>
    )
}