import { ReactNode } from 'react';
import classes from './SideBarIcon.module.css'

const SideBarIcon = ({ icon } : {icon: ReactNode}) => (
    <div className={classes.sidebar_icon}>
        {icon}
    </div>
);

export default SideBarIcon;