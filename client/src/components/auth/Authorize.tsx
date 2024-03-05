import { ReactNode } from 'react';
import useAuthorization, { RolesType } from '../../hooks/useAuthorization';
import UnathorizedErrorPage from '../../pages/Error/UnathorizedErrorPage';

type AuthorizeProps = {
    children: ReactNode,
    roles: RolesType
}

function Authorize({ children, roles }: AuthorizeProps) {

  const { isAuthorized } = useAuthorization();

    return (
        !isAuthorized(roles) ?
            <UnathorizedErrorPage /> :
            <>{children}</>
    )
}

export default Authorize
