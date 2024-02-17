import CaseCard from '../../components/CaseCard/CaseCard';
import useApiQuery from '../../hooks/useApiQuery';
import { CaseDetails } from '../../models/CaseTypes';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../components/FormInputs/Input';

type SearchCaseRequest = {
    FreeTextSearch: string,
    CurrentPage: number,
    PageSize: number
}

function CaseSearchPage() {
    // TODO: Add infinite scrolling
    const [searchParams, setSearchParams] = useSearchParams({ q: "", page: "1" })
    const q = searchParams.get("q");
    const debouncedSearch = useDebounce(q);
    // TODO: doeas this cache? Does this invalidate previous request?
    const { data: cases } = useApiQuery<CaseDetails[], SearchCaseRequest>("/api/search", ["cases", debouncedSearch],
        {
            CurrentPage: 1,
            PageSize: 10,
            FreeTextSearch: debouncedSearch
        });

    return (
        <>
            <div className='w-3/5' >
                <Input value={q ?? ""} className="m-auto mt-2 mb-6" type="search" name="search" placeholder="Search" onChange={(newValue) => {
                    setSearchParams({ q: newValue.target.value, page: "1" }, {
                        replace: true
                    })
                }} />
            </div>
            <main className='w-full' >
                {cases.map((result) => <CaseCard
                    key={result.id}
                    id={result.id}
                    owner={result.ownerId}
                    created={result.created}
                    status={result.status}
                    description={result.description} />)}
            </main>
        </>
    )
}

export default CaseSearchPage