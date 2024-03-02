import useAuthentication from "./useAuthentication";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery } from "react-query";

export const useAuthenticatedQuery = <TResult>(
    keys: Array<any>,
    queryFn: (options: AxiosRequestConfig) => Promise<AxiosResponse>
): {
    data: TResult | undefined,
    error: any,
    status: "error" | "idle" | "loading" | "success"
} => {
    const { getAccessTokenAsync } = useAuthentication();

    const { data, error, status } = useQuery({
        queryKey: [...keys],
        queryFn: async ({ signal }) => {
            const token = await getAccessTokenAsync();
            const response = await queryFn({
                headers: { Authorization: `Bearer ${token}` }, signal
            });

            return response.data as TResult;
        },
        suspense: true
    });

    return { data, error, status }
}