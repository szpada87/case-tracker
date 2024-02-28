import { useParams } from 'react-router-dom';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import { CaseDetails } from '../../models/CaseTypes';
import CaseCard from '../../components/CaseCard/CaseCard';

type CaseDetailsRequest = {
    id: string
}

function CaseDetailsPage() {
    const { id } = useParams<CaseDetailsRequest>();
    const { data } = useAuthenticatedQuery<CaseDetails, undefined>(`/api/data/${id}`, ["cases", id]);

    return (
        <main className='w-full mt-1' >
            {data && <CaseCard caseData={data} />}
        </main>
    )
}

export default CaseDetailsPage