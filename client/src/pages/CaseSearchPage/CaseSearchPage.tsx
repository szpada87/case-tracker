import CaseCard from '../../components/CaseCard/CaseCard';
import { useInfiniteAuthenticatedQuery } from '../../hooks/useInfiniteAuthenticatedQuery';
import { CaseDetails } from '../../models/CaseTypes';
import useDebounce from '../../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/FormInputs/Input';
import { useCallback } from 'react';
import Loader from '../../components/Loader/Loader';
import useInfiniteScrolling from '../../hooks/useInfiniteScrolling';
import classes from './CaseSearchPage.module.css';
import { searchApi } from '../../utils/api';
import { CaseResponse } from '../../shared/api/axios-client';

function CaseSearchPage() {
    const [searchParams, setSearchParams] = useSearchParams({ q: "" })
    const q = searchParams.get("q");
    // TODO: useDeferred? This introduces a flickering during search
    // https://react.dev/reference/react/useDeferredValue Extract fetching logic into a child component wrapped into suspense!
    const debouncedSearch = useDebounce(q);

    const { data: cases, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteAuthenticatedQuery<CaseResponse>(async (page, options) => {
        return await searchApi.searchCases({ currentPage: page, pageSize: 10, freeTextSearch: debouncedSearch }, options);
    }, ["cases", debouncedSearch]);

    const onScroll = useCallback(() => {
        fetchNextPage();
    }, [fetchNextPage])
    const observerTarget = useInfiniteScrolling(onScroll)

    return (
        <>
            <div className='w-3/5' >
                <Input value={q ?? ""} className="m-auto mt-2 mb-6" type="search" name="search" placeholder="Search" onChange={(newValue) => {
                    setSearchParams({ q: newValue.target.value }, {
                        replace: true
                    })
                }} />
            </div>
            <main className='w-full' >
                {cases?.pages.map(page => page.data.map((result) =>
                    <Link key={result.id} className={classes.card_hover} to={`/dashboard/cases/${result.id}`}>
                        <CaseCard
                            caseData={result} />
                    </Link>))}
            </main >
            {(status === "loading" || isFetchingNextPage) && <Loader />
            }
            <div ref={observerTarget}></div>
        </>
    )
}

export default CaseSearchPage