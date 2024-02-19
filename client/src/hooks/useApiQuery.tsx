import useSWR from "swr";
import useAuthentication from "./useAuthentication";
import axios from "axios";
import useSWRInfinite from "swr/infinite";

type PagedParams = {
    currentPage: number,
    pageSize: number
}

export const useApiQueryInfinite = <TResult extends Array<any>, TParams extends PagedParams>(
    url: string,
    keys: Array<any>,
    params: TParams): { data: TResult[], size: number, setSize: (_size: number) => void, loading: boolean } => {
    const getKey = (pageIndex: number, previousPageData: TResult) => {
        if (previousPageData && !previousPageData.length) return null
        return [...keys, pageIndex];
    }
    const { getAccessTokenAsync } = useAuthentication();
    const { data, size, setSize, isValidating } = useSWRInfinite(getKey, async (args) => {
        const token = await getAccessTokenAsync();
        // page number will be appended as last to keys.
        params.currentPage = args[args.length - 1] + 1;

        const response = await axios.get(url, {
            params, headers: { Authorization: `Bearer ${token}` }
        })

        return response.data as TResult
    }, {
        suspense: true
    });

    return { data: data || [], size, setSize, loading: isValidating }
}

export default <TResult, TParams>(url: string, key: string | string[], params: TParams): { data: TResult } => {
    const { getAccessTokenAsync } = useAuthentication();
    const { data } = useSWR(key, async () => {
        const token = await getAccessTokenAsync();
        const response = await axios.get(url, {
            params, headers: { Authorization: `Bearer ${token}` }
        })

        return response.data as TResult
    }, { suspense: true });

    return { data }
}