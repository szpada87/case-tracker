import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { CaseInfiniteList } from '../../components/CaseList/CaseInfiniteList';
import { Suspense, useDeferredValue, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { SearchInput } from '../../components/SearchInput/SearchInput';

function CaseSearchPage() {
    const [searchParams, setSearchParams] = useSearchParams({ q: "" })
    const q = searchParams.get("q");
    const debouncedSearch = useDebounce(q);
    const deferredSearch = useDeferredValue(debouncedSearch);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className='w-3/5' >
                <SearchInput q={q ?? ""} loading={isLoading} name="search" placeholder="Search" onChange={(newValue) => {
                    setSearchParams({ q: newValue.target.value }, {
                        replace: true
                    })
                    setIsLoading(true);
                }} />
            </div>
            <Suspense fallback={<Loader />}>
                <CaseInfiniteList query={deferredSearch} onSettled={() => {
                    setIsLoading(false);
                }} />
            </Suspense>
        </>
    )
}

export default CaseSearchPage