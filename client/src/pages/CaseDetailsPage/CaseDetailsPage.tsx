import { useParams } from 'react-router-dom';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import { CaseDetails } from '../../models/CaseTypes';
import CaseDetailsCard from '../../components/CaseDetailsCard/CaseDetailsCard';

type CaseDetailsRequest = {
    id: string
}

function CaseDetailsPage() {
    const { id } = useParams<CaseDetailsRequest>();
    const { data } = useAuthenticatedQuery<CaseDetails, undefined>(`/api/data/${id}`, ["cases", id]);

    return (
        <main className='w-full' >
            {data && <CaseDetailsCard
                key={data.id}
                id={data.id}
                owner={data.ownerId}
                created={data.created}
                status={data.status}
                description={data.description} />}
        </main>
    )
}

export default CaseDetailsPage