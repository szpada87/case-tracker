import useAuthentication from "./useAuthentication";
import axios from "axios";
import { useQuery } from "react-query";

export const useAuthenticatedQuery = <TResult, TParams>(
    url: string,
    keys: Array<any>,
    params?: TParams): {
        data: TResult | undefined,
        error: any,
        status: "error" | "idle" | "loading" | "success"
    } => {
    const { getAccessTokenAsync } = useAuthentication();

    const { data, error, status } = useQuery({
        queryKey: [...keys],
        queryFn: async ({ signal }) => {
            const token = await getAccessTokenAsync();
            const response = await axios.get(url, {
                params, headers: { Authorization: `Bearer ${token}` }, signal
            })

            return response.data as TResult;
        },
        suspense: true
    });

    return { data, error, status }
}