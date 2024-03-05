import { FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "../../../hooks/useDarkMode";
import classes from "./ThemeIcon.module.css"

const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
        <span onClick={handleMode}>
            {darkTheme ? (
                <FaSun size='24' className={classes.top_navigation_icon} />
            ) : (
                <FaMoon size='24' className={classes.top_navigation_icon} />
            )}
        </span>
    );
};

export default ThemeIcon;