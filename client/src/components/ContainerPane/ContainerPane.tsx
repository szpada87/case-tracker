import { ReactNode } from 'react';

type ContainerPaneProps = {
    children: ReactNode,
}

function ContainerPane({ children }: ContainerPaneProps) {
    return (<>{children}</>)
}

export default ContainerPane
