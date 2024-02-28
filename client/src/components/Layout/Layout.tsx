import { ReactNode } from 'react';
import classes from "./Layout.module.css";
import SideBar from '../SideBar/SideBar';
import TopNavigation from '../TopNavigation/TopNavigation';
import Footer from '../Footer/Footer';

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex'>
            <div className={classes.background}>
                <div className={classes.content_container}>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <div className='flex'>
            <SideBar />
            <div className={classes.background}>
                <div className="ml-16">
                    <div className={classes.content_container}>
                        <TopNavigation />
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
