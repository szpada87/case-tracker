import { FaHashtag, FaUserCircle } from 'react-icons/fa';
import ThemeIcon from '../ThemeIcon/ThemeIcon';
import classes from './TopNavigation.module.css'
import useUserMetadata from '../../hooks/useUserMetadata';
import { Link } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';

const TopNavigation = () => {
    const { user } = useUserMetadata();
    const { isAuthenticated } = useAuthentication();

    return (
        <div className={classes.top_navigation}>
            <FaHashtag size='20' className={classes.title_hashtag} />
            <h5 className={classes.title_text}>case-tracker</h5>
            <ThemeIcon />
            {!isAuthenticated && <div className={classes.top_navigation_link}>Hello, there!</div>}
            {user &&
                <Link className={classes.top_navigation_link} to='/dashboard/profile' >
                    <UserCircle />
                    <span className={classes.user_name}>{user.name}</span>
                </Link>}
        </div>
    );
};

const UserCircle = () => <FaUserCircle size='24' className={classes.top_navigation_icon} />;

export default TopNavigation;