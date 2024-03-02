import { FormSelect, FormTextArea } from '../../components/FormInputs/FormInputs';
import { useAuthenticatedMutation } from '../../hooks/useAuthenticatedMutation';
import useValidationForm, { ValidationErrorInfo } from '../../hooks/useValidationForm';
import { Status } from '../../models/CaseTypes';
import { Form } from '../../components/Form/Form';
import { AxiosError } from 'axios';
import { Controller } from 'react-hook-form';
import Datepicker from '../../components/Datepicker/Datepicker';
import getEnumKeys from '../../utils/getEnumKeys';
import { dataApi } from '../../utils/api';
import { CreateCaseRequest } from '../../shared/api/axios-client';

export default function CaseAddPage() {
    const { register, handleSubmit, control, errors, setApiValidationErrors } = useValidationForm<CreateCaseRequest>();
    const mutation = useAuthenticatedMutation<CreateCaseRequest, unknown>(async (request, options) => {
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
        resetQueries: true
    });
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <main >
            <Form onSubmit={onSubmit} loading={mutation.status === "loading"} error={mutation.error as Error}>
                <div className="flex flex-wrap mb-2">
                    <div className='w-full md:w-1/2 px-3'>
                        <FormSelect {...register("status", {
                            valueAsNumber: true
                        })} label="Status" error={errors?.status}>
                            {getEnumKeys(Status).map((key, index) => (
                                <option key={index} value={Status[key]}>
                                    {key}
                                </option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className='w-full md:w-1/2 px-3'>
                        <Controller name="expire" control={control} render={({ field: { onChange, onBlur } }) => (
                            <Datepicker onChange={onChange} onBlur={onBlur} options={{ inputNameProp: "expire", inputIdProp: "expire" }} label='Expires' error={errors?.expire} name='expire' />
                        )} />
                    </div>
                </div>
                <div className='w-full px-3' >
                    <FormTextArea {...register("description", {
                        required: "This field is required", maxLength: {
                            value: 256,
                            message: "This field must be less than 256 characters."
                        }
                    })} label="Description" error={errors?.description} />
                </div>
            </Form>
        </main>
    );
}