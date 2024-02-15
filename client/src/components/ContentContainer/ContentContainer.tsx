import { ReactNode } from 'react';
import classes from "./ContentContainer.module.css";
import TopNavigation from "../TopNavigation/TopNavigation";

const ContentContainer = ({ children }: { children: ReactNode }) => (
    <div className={classes.content_container}>
        <TopNavigation />
        <div className={classes.content_list}>
            {children}
        </div>
    </div>
);

export default ContentContainer;