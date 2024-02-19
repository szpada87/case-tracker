import CaseCard from '../../components/CaseCard/CaseCard';
import { useApiQueryInfinite } from '../../hooks/useApiQuery';
import { CaseDetails } from '../../models/CaseTypes';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../components/FormInputs/Input';
import { useRef } from 'react';
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
    const sizeRef = useRef(size);

    const observerTarget = useInfiniteScrolling(() => {
        sizeRef.current += 1;
        setSize(sizeRef.current);
    })

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
        </>
    )
}

export default CaseSearchPage