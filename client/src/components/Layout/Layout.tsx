import { ReactNode } from 'react';
import classes from "./Layout.module.css";
import SideBar from '../SideBar/SideBar';
import TopNavigation, { TopNavigationLink } from '../TopNavigation/TopNavigation';
import Footer from '../Footer/Footer';
import useUserMetadata from '../../hooks/useUserMetadata';
import useAuthentication from '../../hooks/useAuthentication';
import ThemeIcon from '../ThemeIcon/ThemeIcon';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex'>
            <div className={classes.background}>
                <div className={classes.content_container}>
                    <TopNavigation>
                        <ThemeIcon />
                    </TopNavigation>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

const UserCircle = () => <FaUserCircle size='24' className={classes.user_icon} />;

export const DashboardLayout = ({ children }: LayoutProps) => {
    const { user } = useUserMetadata();
    const { isAuthenticated } = useAuthentication();
    return (
        <div className='flex'>
            <SideBar />
            <div className={classes.background}>
                <div className="ml-7">
                    <div className={classes.content_container}>
                        <TopNavigation>
                            {!isAuthenticated && <TopNavigationLink>Hello, there!</TopNavigationLink>}
                            {user &&
                                <TopNavigationLink>
                                    <Link className='flex' to='/dashboard/profile' >
                                        <UserCircle />
                                        <span className={classes.user_name}>{user.name}</span>
                                    </Link>
                                </TopNavigationLink>}
                            <ThemeIcon />
                        </TopNavigation>
                        <div className={classes.content_list}>
                            {children}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
