import { ReactNode } from 'react';
import classes from "./ContentContainer.module.css";
import TopNavigation from "../TopNavigation/TopNavigation";
import Footer from '../Footer/Footer';

const ContentContainer = ({ children }: { children: ReactNode }) => (
    <div className={classes.content_container}>
        <TopNavigation />
        <div className={classes.content_list}>
            {children}
        </div>
        <Footer />
    </div>
);

export default ContentContainer;