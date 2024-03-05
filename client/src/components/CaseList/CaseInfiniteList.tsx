import { Link } from "react-router-dom"
import CaseCard from "../CaseCard/CaseCard"
import { useInfiniteAuthenticatedQuery } from "../../hooks/useInfiniteAuthenticatedQuery";
import { CaseResponse } from "../../shared/api/axios-client";
import { searchApi } from "../../utils/api";
import classes from "./CaseInfiniteList.module.css";
import Loader from "../Loader/Loader";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import { useCallback } from "react";

type CaseInfiniteListProps = {
    query: string,
    onSettled?: () => void
}

export const CaseInfiniteList = ({ query, onSettled }: CaseInfiniteListProps) => {
    const { data: cases, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteAuthenticatedQuery<CaseResponse>(async (page, options) => {
        return await searchApi.searchCases({ currentPage: page, pageSize: 10, freeTextSearch: query }, options);
    }, ["cases", query], { onSettled: onSettled });

    const onScroll = useCallback(() => {
        fetchNextPage();
    }, [fetchNextPage])
    const observerTarget = useInfiniteScrolling(onScroll)
    return <>
        <main className='w-full' >
            {cases?.pages.map(page => page.data.map((result) =>
                <Link key={result.id} className={classes.card_hover} to={`/dashboard/cases/${result.id}`}>
                    <CaseCard
                        caseData={result} />
                </Link>))}
        </main >
        {(status === "loading" || isFetchingNextPage) && <Loader />}
        <div ref={observerTarget}></div>
    </>
}