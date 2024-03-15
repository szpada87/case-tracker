import { Link } from "react-router-dom";
import CaseCard from "../CaseCard/CaseCard";
import classes from "./CaseInfiniteList.module.css";
import Loader from "../../common/Loader/Loader";
import useInfiniteScrolling from "../../../hooks/useInfiniteScrolling";
import { useCallback } from "react";
import { useApi } from "../../../hooks/useApi";
import { useInfiniteQuery } from "react-query";

type CaseInfiniteListProps = {
    query: string,
    onSettled?: () => void
}

export const CaseInfiniteList = ({ query, onSettled }: CaseInfiniteListProps) => {
    const { searchApi } = useApi();
    const { data: cases, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryFn: async ({ pageParam = 1, signal }) => (await searchApi.searchCases({
                currentPage: pageParam,
                pageSize: 10,
                freeTextSearch: query
            }, { signal })).data,
            getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
            queryKey: ["cases", query],
            onSettled: onSettled,
            suspense: true
        });

    const onScroll = useCallback(() => {
        fetchNextPage();
    }, [fetchNextPage])
    const observerTarget = useInfiniteScrolling(onScroll)
    return <>
        <main className='w-full' >
            {cases?.pages?.map(page => page.data?.map((result) =>
                <Link key={result.id} className={classes.card_hover} to={`/dashboard/cases/${result.id}`}>
                    <CaseCard
                        caseData={result} />
                </Link>))}
        </main >
        {(status === "loading" || isFetchingNextPage) && <Loader />}
        <div ref={observerTarget}></div>
    </>
}