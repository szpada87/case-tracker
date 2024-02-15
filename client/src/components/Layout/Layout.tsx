import { ReactNode } from 'react';
import SideBar from '../SideBar/SideBar';
import ContentContainer from '../ContentContainer/ContentContainer';

type LayoutProps = {
    children: ReactNode,
}

function Layout({ children }: LayoutProps) {
    return (
        <div className='flex'>
            <SideBar />
            <ContentContainer>{children}</ContentContainer>
        </div>

    )
}

export default Layout
