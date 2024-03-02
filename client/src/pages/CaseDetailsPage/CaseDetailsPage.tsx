import { useParams } from 'react-router-dom';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import { CaseDetails } from '../../models/CaseTypes';
import CaseCard from '../../components/CaseCard/CaseCard';
import { dataApi } from '../../utils/api';

type CaseDetailsRequest = {
    id: string
}

function CaseDetailsPage() {
    const { id } = useParams<CaseDetailsRequest>();
    const { data } = useAuthenticatedQuery<CaseDetails>(["cases", id], async (options) => {
        return dataApi.caseDetailsById({ id: parseInt(id!) }, options);
    });

    return (
        <main className='w-full mt-1' >
            {data && <CaseCard caseData={data} />}
        </main>
    )
}

export default CaseDetailsPage