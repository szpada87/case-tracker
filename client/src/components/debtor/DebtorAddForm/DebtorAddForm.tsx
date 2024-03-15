import { Form } from "../../forms/Form/Form";
import { FormInput } from "../../forms/FormInputs/FormInputs";
import useDebtorAdd from "./useDebtorAdd";

type DebtorAddFormProps = {
    onDebtorAdded: () => void
}

export default function DebtorAddForm({ onDebtorAdded }: DebtorAddFormProps) {
    const {
        register,
        errors,
        onSubmit,
        mutation
    } = useDebtorAdd();

    return (
        <main >
            <Form onSubmit={async ()=> {
                await onSubmit();
                onDebtorAdded()
            }} loading={mutation.status === "loading"} error={mutation.error as Error}>
                <div className='w-full px-3' >
                    <FormInput {...register("name", {
                        required: "This field is required", maxLength: {
                            value: 128,
                            message: "This field must be less than 128 characters."
                        }
                    })} label="Name" error={errors?.name} />
                </div>
            </Form>
        </main>
    );
}