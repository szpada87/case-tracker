import { useMemo } from "react";
import { Configuration, DataApi, SearchApi } from "../shared/api/axios-client";
import useAuthentication from "./useAuthentication";

const BASE_PATH = "https://case-tracker.dev";


export const useApi = () => {
    const { getAccessTokenAsync } = useAuthentication();
    // TODO: to custom hook that inject the token
    const { dataApi, searchApi } = useMemo(() => {
        const dataApi = new DataApi(new Configuration({
            accessToken: async () => await getAccessTokenAsync() || ""
        }), BASE_PATH)

        const searchApi = new SearchApi(new Configuration({
            accessToken: async () => await getAccessTokenAsync() || ""
        }), BASE_PATH);

        return { dataApi, searchApi };
    }, [getAccessTokenAsync])

    return { dataApi, searchApi };
}