import { useParams } from 'react-router-dom';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import CaseCard from '../../components/case/CaseCard/CaseCard';
import { dataApi } from '../../utils/api';
import { CaseDetailsResponse } from '../../shared/api/axios-client';

type CaseDetailsRequest = {
    id: string
}

function CaseDetailsPage() {
    const { id } = useParams<CaseDetailsRequest>();
    const { data } = useAuthenticatedQuery<CaseDetailsResponse>(["cases", id], async (options) => {
        return dataApi.caseDetailsById({ id: parseInt(id!) }, options);
    });

    return (
        <main className='w-full mt-1 p-4' >
            {data && <CaseCard caseData={data} />}
        </main>
    )
}

export default CaseDetailsPage