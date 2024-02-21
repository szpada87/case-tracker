import CaseCard from '../../components/CaseCard/CaseCard';
import { useApiQueryInfinite } from '../../hooks/useApiQuery';
import { CaseDetails } from '../../models/CaseTypes';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../components/FormInputs/Input';
import { useCallback, useEffect, useState } from 'react';
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
    const { data: cases, size, setSize, loading } = useApiQueryInfinite<CaseDetails[], SearchCaseRequest>("/api/search", ["cases", debouncedSearch],
        {
            currentPage: 1,
            pageSize: 10,
            freeTextSearch: debouncedSearch
        });

    // NOT perfect solution.
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(false);
    }, [debouncedSearch, setEnabled])

    const setSizeCallback = useCallback(() => {
        setSize(prev => {
            return prev + 1;
        });
    }, [setSize])
    // TODO: This should be not fired when there are more results to load - API should return metadata about more pages to be loaded.
    const observerTarget = useInfiniteScrolling(setSizeCallback, enabled)

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
                {cases.map(page => page.map((result) => <CaseCard
                    key={result.id}
                    id={result.id}
                    owner={result.ownerId}
                    created={result.created}
                    status={result.status}
                    description={result.description} />))}
            </main>
            {loading && <Loader />}
            <div ref={observerTarget}></div>
            {!enabled && size === 1 && <button onClick={() => setEnabled(true)}>Load more</button>}
        </>
    )
}

export default CaseSearchPage