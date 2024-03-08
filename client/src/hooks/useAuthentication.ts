import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export default () => {
    const {
        isAuthenticated,
        isLoading,
        logout,
        loginWithPopup,
        getAccessTokenSilently,
        getAccessTokenWithPopup
    } = useAuth0();

    const getAccessTokenAsync = useCallback(async () => {
        try {
            if (isAuthenticated && !isLoading) {
                return await getAccessTokenSilently()
            } else {
                return await getAccessTokenWithPopup();
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }, [isAuthenticated, isLoading, getAccessTokenSilently, getAccessTokenWithPopup])

    const authenticateUser = useCallback(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithPopup();
        }
    }, [isAuthenticated, isLoading, loginWithPopup])

    const logoutUser = useCallback(() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    }, [logout])

    return { authenticateUser, logoutUser, getAccessTokenAsync, isAuthenticated };
}