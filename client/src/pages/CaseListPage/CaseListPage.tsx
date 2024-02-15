import CaseCard from '../../components/CaseCard/CaseCard';
import useApiQuery from '../../hooks/useApiQuery';
import { CaseDetails } from '../../models/CaseTypes';

function CaseListPage() {
    const { data: cases } = useApiQuery<CaseDetails[], unknown>("/api/data", "cases", {});

    return (
        <main className='w-full' >
            {cases.map((result) => <CaseCard
                key={result.id}
                id={result.id}
                owner={result.ownerId}
                created={result.created}
                status={result.status}
                description={result.description} />)}
        </main>
    )
}

export default CaseListPage