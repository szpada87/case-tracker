import { useAuth0 } from "@auth0/auth0-react";

export type RolesType = ('admin' | 'user')[]

export default () => {
    const { user } = useAuth0();

    const isAuthorized = (roles: RolesType) => user && roles.some(role => user['case-tracker.dev/roles'].includes(role));

    return { isAuthorized };
}