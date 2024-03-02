import useAuthentication from "./useAuthentication";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { InfiniteData, useInfiniteQuery } from "react-query";

type PagedResponse<T> = {
    data: T[],
    currentPage: number,
    nextPage?: number
}

export const useInfiniteAuthenticatedQuery = <TResult>(
    queryFn: (page: number, options: AxiosRequestConfig) => Promise<AxiosResponse>,
    keys: Array<any>): {
        data: InfiniteData<PagedResponse<TResult>> | undefined,
        error: any,
        status: "error" | "idle" | "loading" | "success",
        fetchNextPage: () => void,
        isFetchingNextPage: boolean
    } => {

    const { getAccessTokenAsync } = useAuthentication();
    const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [...keys],
        queryFn: async ({ pageParam = 1, signal }) => {
            const token = await getAccessTokenAsync();
            const response = await queryFn(pageParam, {
                headers: { Authorization: `Bearer ${token}` }, signal
            })
            return response.data as PagedResponse<TResult>;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    });

    return { data, error, status, fetchNextPage, isFetchingNextPage }
}