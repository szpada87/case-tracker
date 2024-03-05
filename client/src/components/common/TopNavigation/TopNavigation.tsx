import { FaHashtag } from 'react-icons/fa';
import classes from './TopNavigation.module.css'

import { ReactNode } from 'react';

type TopNavigationProps = {
    children?: ReactNode
}

const TopNavigation = ({ children }: TopNavigationProps) => {
    return (
        <div className={classes.top_navigation}>
            <FaHashtag size='20' className={classes.title_hashtag} />
            <h5 className={classes.title_text}>case-tracker</h5>
            {children}
           
        </div>
    );
};

export default TopNavigation;

type TopNavigationLinkProps = {
    children: ReactNode
}

export const TopNavigationLink = ({ children }: TopNavigationLinkProps) => {
    return <div className={classes.top_navigation_link}>{children}</div>

}