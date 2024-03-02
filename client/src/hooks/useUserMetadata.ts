import { useAuth0 } from "@auth0/auth0-react";

export default () => {
    const {
        user
    } = useAuth0();    
    
    return { user };
}