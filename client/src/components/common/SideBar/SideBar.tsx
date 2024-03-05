import { FaDoorOpen, FaList } from 'react-icons/fa';
import SideBarIcon from '../SideBarIcon/SideBarIcon';
import classes from './SideBar.module.css'
import { BsPlus, BsHouse, BsLock } from 'react-icons/bs';
import useAuthentication from '../../../hooks/useAuthentication';
import useAuthorization from '../../../hooks/useAuthorization';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const { authenticateUser, logoutUser, isAuthenticated } = useAuthentication();
    const { isAuthorized } = useAuthorization();

    if (!isAuthenticated) {
        return <nav className={classes.sidebar}>
            <SideBarIcon icon={<BsHouse size="28" />} />
            <a onClick={() => authenticateUser()} href="#" >
                <SideBarIcon icon={<BsLock size="22" />} />
            </a>
        </nav>
    }

    const isUser = isAuthorized(['admin', 'user']);
    const isAdmin = isAuthorized(['admin']);

    return (
        <nav className={classes.sidebar}>
            <SideBarIcon icon={<BsHouse size="28" />} />
            {isUser && <Link to='/dashboard/cases' >
                <SideBarIcon icon={<FaList size="22" />} />
            </Link>}
            {isAdmin && <Link to='/dashboard/add' >
                <SideBarIcon icon={<BsPlus size="32" />} />
            </Link>}
            <a onClick={() => logoutUser()} href="#" >
                <SideBarIcon icon={<FaDoorOpen size="22" />} />
            </a>
        </nav>
    );
};

export default SideBar;