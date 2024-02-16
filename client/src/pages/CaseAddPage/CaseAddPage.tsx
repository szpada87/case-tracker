import { FormInput } from '../../components/FormInputs/FormInputs';
import ContainerPane from '../../components/ContainerPane/ContainerPane';
import { useApi } from '../../hooks/useApi';
import useValidationForm, { ValidationErrorInfo } from '../../hooks/useValidationForm';
import { CaseDetails, CreateCaseRequest } from '../../models/CaseTypes';
import { Form } from '../../components/Form/Form';
import { AxiosError } from 'axios';
import { Controller } from 'react-hook-form';
import Datepicker from '../../components/Datepicker/Datepicker';

export default function CaseAddPage() {
    const { register, handleSubmit, control, errors, setApiValidationErrors } = useValidationForm<CreateCaseRequest>();
    const { post, loading, error } = useApi<CreateCaseRequest, CaseDetails>("/api/data", ["cases"], {
        // TODO: move to useCallback
        // TODO: extract common logic
        onError: (e) => {
            if (e instanceof AxiosError && e.response?.status === 400 && e.response?.data) {
                const responseInfo = e.response?.data as ValidationErrorInfo<CreateCaseRequest>;
                setApiValidationErrors(responseInfo);
                return true;
            }
            return false;
        }
    });
    const onSubmit = handleSubmit((data) => {
        post(data);
    });

    return (
        <ContainerPane>
            <main >
                <Form onSubmit={onSubmit} loading={loading} error={error}>
                    <div className='w-full px-3' >
                        <FormInput {...register("description", { required: "This field is required" })} label="Description" error={errors?.description} />
                    </div>
                    <div className="flex flex-wrap mb-2">
                        <div className='w-full md:w-1/2 px-3'>
                            <FormInput type="number" {...register("status", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Value has to be 0 or higher" },
                                max: { value: 3, message: "Value has to be 3 or lower" }
                            })} label="Status" error={errors?.status} />
                        </div>
                        <div className='w-full md:w-1/2 px-3'>
                            {/* <FormInput {...register("expire")} label="Expires on" error={errors?.expire} /> */}
                            <Controller name="expire" control={control} render={({ field: { onChange, onBlur } }) => (
                                <Datepicker onChange={onChange} onBlur={onBlur} options={{ inputNameProp: "expire", inputIdProp: "expire" }} label='Expires' error={errors?.expire} name='expire' />
                            )} />
                        </div>
                    </div>
                </Form>
            </main>
        </ContainerPane>
    );
}