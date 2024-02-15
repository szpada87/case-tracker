import useSWR from "swr";
import useAuthentication from "./useAuthentication";
import axios from "axios";

export default <TResult, TParams>(url: string, key: string, params: TParams): { data: TResult } => {
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