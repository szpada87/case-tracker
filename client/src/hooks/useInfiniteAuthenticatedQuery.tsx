import useAuthentication from "./useAuthentication";
import axios from "axios";
import { InfiniteData, useInfiniteQuery } from "react-query";

type PagedParams = {
    currentPage: number,
    pageSize: number
}

type PagedResponse<T> = {
    data: T[],
    currentPage: number,
    nextPage?: number
}

export const useInfiniteAuthenticatedQuery = <TResult, TParams extends PagedParams>(
    url: string,
    keys: Array<any>,
    params: TParams): {
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
            params.currentPage = pageParam;

            const response = await axios.get(url, {
                params, headers: { Authorization: `Bearer ${token}` }, signal
            })

            return response.data as PagedResponse<TResult>;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    });

    return { data, error, status, fetchNextPage, isFetchingNextPage }
}