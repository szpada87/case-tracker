import { useNavigate } from "react-router-dom";
import { useModal } from "../../components/Modal/useModal";
import { useAuthenticatedMutation } from "../../hooks/useAuthenticatedMutation";
import useValidationForm, { ValidationErrorInfo } from "../../hooks/useValidationForm";
import { CaseDetailsResponse, CreateCaseRequest } from "../../shared/api/axios-client";
import { dataApi } from "../../utils/api";
import { AxiosError } from "axios";

export default function() {
    const navigate = useNavigate()
    const { register, handleSubmit, control, errors, setApiValidationErrors, reset } = useValidationForm<CreateCaseRequest>();
    // TODO: BUG: calendar control does not reset properly
    const { modalConf, showModal, closeModal } = useModal(onclose = () => reset());
    // TODO: issue with return type - issue with open api swagger doc
    const mutation = useAuthenticatedMutation<CreateCaseRequest, CaseDetailsResponse>(async (request, options) => {
        return await dataApi.createCase({ createCaseRequest: request }, options);
    }, ["cases"], {
        onError: (e) => {
            if (e instanceof AxiosError && e.response?.status === 400 && e.response?.data) {
                const responseInfo = e.response?.data as ValidationErrorInfo<CreateCaseRequest>;
                setApiValidationErrors(responseInfo);
                return true;
            }
            return false;
        },
        onSuccess: () => {
            showModal();
        },
        resetQueries: true
    });
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