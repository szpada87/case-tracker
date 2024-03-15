import { useQuery } from "react-query";
import { useApi } from "../../hooks/useApi";
import { DebtorDetailsResponse } from "../../shared/api/axios-client";

export default function () {
    const { dataApi } = useApi();
    const { data, isLoading } = useQuery<DebtorDetailsResponse[]>({
        queryKey: ["debtors"],
        queryFn: async ({ signal }) => (await dataApi.allDebtors({ signal })).data
    })

    return { data, isLoading };
}