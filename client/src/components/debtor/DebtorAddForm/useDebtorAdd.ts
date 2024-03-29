import { useMutation, useQueryClient } from "react-query";
import { useApi } from "../../../hooks/useApi";
import { CreateDebtorRequest } from "../../../shared/api/axios-client";
import useValidationForm, { ValidationErrorInfo } from "../../../hooks/useValidationForm";
import { AxiosError } from "axios";

export default function (onDebtorAdded: () => void) {
    const { register, handleSubmit, errors, setApiValidationErrors, reset } = useValidationForm<CreateDebtorRequest>();

    const { dataApi } = useApi();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (request: CreateDebtorRequest) => await dataApi.createDebtor({ createDebtorRequest: request }),
        mutationKey: ["debtors"],
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["debtors"] });
            reset();
            onDebtorAdded();
        },
        onError: (e) => {
            if (e instanceof AxiosError && e.response?.status === 400 && e.response?.data) {
                const responseInfo = e.response?.data as ValidationErrorInfo<CreateDebtorRequest>;
                setApiValidationErrors(responseInfo);
            }
        },
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return {
        register,
        errors,
        onSubmit,
        mutation
    }
}