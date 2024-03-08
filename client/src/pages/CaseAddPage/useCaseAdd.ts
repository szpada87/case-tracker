import { useNavigate } from "react-router-dom";
import { useModal } from "../../components/common/Modal/useModal";
import useValidationForm, { ValidationErrorInfo } from "../../hooks/useValidationForm";
import { CreateCaseRequest } from "../../shared/api/axios-client";
import { AxiosError } from "axios";
import { useApi } from "../../hooks/useApi";
import { useMutation, useQueryClient } from "react-query";

export default function () {
    const navigate = useNavigate()
    const { register, handleSubmit, control, errors, setApiValidationErrors, reset } = useValidationForm<CreateCaseRequest>();
    // TODO: BUG: calendar control does not reset properly
    const { modalConf, showModal, closeModal } = useModal(onclose = () => reset());

    const { dataApi } = useApi();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (request: CreateCaseRequest) => await dataApi.createCase({ createCaseRequest: request }),
        mutationKey: ["cases"],
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["cases"] });
            // This has to be done in order for the infinite query to refresh properly on mount.
            await queryClient.resetQueries(["cases"]);
            showModal();
        },
        onError: (e) => {
            if (e instanceof AxiosError && e.response?.status === 400 && e.response?.data) {
                const responseInfo = e.response?.data as ValidationErrorInfo<CreateCaseRequest>;
                setApiValidationErrors(responseInfo);
            }
        },
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    const handleStayOnPage = () => {
        closeModal();
        mutation.reset()
    }
    const handleShowMyCase = () => {
        const id = mutation.data?.data.id
        id && navigate(`/dashboard/cases/${id}`);
    }

    return {
        register,
        control,
        errors,
        modalConf,
        onSubmit,
        handleStayOnPage,
        handleShowMyCase,
        mutation
    }
}