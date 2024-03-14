// @ts-nocheck
import { useMemo } from "react";
import { Configuration, DataApi, SearchApi } from "../shared/api/axios-client";
import useAuthentication from "./useAuthentication";

const BASE_PATH = import.meta.env.VITE_BASE_PATH || window.injectedEnv.VITE_BASE_PATH;

export const useApi = () => {
    const { getAccessTokenAsync } = useAuthentication();
    const { dataApi, searchApi } = useMemo(() => {
        const dataApi = new DataApi(new Configuration({
            accessToken: async () => await getAccessTokenAsync() || ""
        }), BASE_PATH)

        const searchApi = new SearchApi(new Configuration({
            accessToken: async () => await getAccessTokenAsync() || "",
            baseOptions: {
                Headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        }), BASE_PATH);

        return { dataApi, searchApi };
    }, [getAccessTokenAsync])

    return { dataApi, searchApi };
}