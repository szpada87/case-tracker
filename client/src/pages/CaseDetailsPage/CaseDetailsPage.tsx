import { useParams } from 'react-router-dom';
import CaseCard from '../../components/case/CaseCard/CaseCard';
import { CaseDetailsResponse } from '../../shared/api/axios-client';
import { useQuery } from 'react-query';
import { useApi } from '../../hooks/useApi';
import DebtorCard from '../../components/debtor/DebtorCard/DebtorCard';

type CaseDetailsRequest = {
    id: string
}

function CaseDetailsPage() {
    const { id } = useParams<CaseDetailsRequest>();
    const { dataApi } = useApi();
    const { data } = useQuery<CaseDetailsResponse>({
        queryKey: ["cases", id],
        queryFn: async ({ signal }) => (await dataApi.caseDetailsById({
            id: parseInt(id || "")
        }, { signal })).data,
        suspense: true
    })

    return (
        <main className='w-full mt-1 p-4 space-y-2' >
            {data && <CaseCard caseData={data} />}
            {data?.debtorDetails && <DebtorCard debtorData={data.debtorDetails} />}
        </main>
    )
}

export default CaseDetailsPage