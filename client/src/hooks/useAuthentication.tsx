import { useAuth0 } from "@auth0/auth0-react";

export default () => {
    const {
        isAuthenticated,
        isLoading,
        logout,
        loginWithPopup,
        getAccessTokenSilently,
        getAccessTokenWithPopup
    } = useAuth0();

    const getAccessTokenAsync = async () => {
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
    }

    const authenticateUser = () => {
        if (!isAuthenticated && !isLoading) {
            loginWithPopup();
        }
    }

    const logoutUser = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    }

    return { authenticateUser, logoutUser, getAccessTokenAsync, isAuthenticated };
}