import classes from './Footer.module.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.content}>
                <span className={classes.info_text}>© 2024. All Rights Reserved.
                </span>
                <ul className={classes.link_list}>
                    <li>
                        <Link className={classes.navigation_link} to='/home' >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.navigation_link} to='/home/cases' >
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.navigation_link} to='/home/add' >
                            Add
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;