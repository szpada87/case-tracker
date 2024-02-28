import CaseCard from '../../components/CaseCard/CaseCard';
import { useInfiniteAuthenticatedQuery } from '../../hooks/useInfiniteAuthenticatedQuery';
import { CaseDetails } from '../../models/CaseTypes';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../components/FormInputs/Input';
import { useCallback } from 'react';
import Loader from '../../components/Loader/Loader';
import useInfiniteScrolling from '../../hooks/useInfiniteScrolling';

type SearchCaseRequest = {
    freeTextSearch: string,
    currentPage: number,
    pageSize: number
}

function CaseSearchPage() {
    const [searchParams, setSearchParams] = useSearchParams({ q: "" })
    const q = searchParams.get("q");
    const debouncedSearch = useDebounce(q);

    const { data: cases, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteAuthenticatedQuery<CaseDetails, SearchCaseRequest>("/api/search", ["cases", debouncedSearch],
        {
            currentPage: 1,
            pageSize: 10,
            freeTextSearch: debouncedSearch
        });

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
                {cases?.pages.map(page => page.data.map((result) => <CaseCard
                    key={result.id}
                    caseData={result} />))}
            </main>
            {(status === "loading" || isFetchingNextPage) && <Loader />}
            <div ref={observerTarget}></div>
        </>
    )
}

export default CaseSearchPage