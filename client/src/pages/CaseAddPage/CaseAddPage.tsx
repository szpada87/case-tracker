import { FormSelect, FormTextArea } from '../../components/forms/FormInputs/FormInputs';
import { Status } from '../../models/CaseTypes';
import { Form } from '../../components/forms/Form/Form';
import { Controller } from 'react-hook-form';
import Datepicker from '../../components/forms/Datepicker/Datepicker';
import getEnumKeys from '../../utils/getEnumKeys';
import Modal from '../../components/common/Modal/Modal';
import { Button } from '../../components/common/Button/Button';
import useCaseAdd from './useCaseAdd';
import useGetDebtors from './useGetDebtors';
import { useModal } from '../../components/common/Modal/useModal';
import DebtorAddForm from '../../components/debtor/DebtorAddForm/DebtorAddForm';
import { Card } from '../../components/common/Card/Card';


export default function CaseAddPage() {
    const {
        register,
        control,
        errors,
        modalConf,
        onSubmit,
        handleStayOnPage,
        handleShowMyCase,
        mutation
    } = useCaseAdd();

    const { data: debtorData, isLoading: loadingDebtors } = useGetDebtors();

    const { modalConf: debtorAddModalConf, showModal: showDebtorAddModal, closeModal: closeDebtorAddModal } = useModal();

    return (
        <main >
            <Card className="px-12 pt-6 pb-8 mb-4 ">
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
                            <Controller name="expire" control={control} render={({ field: { onChange, onBlur, name } }) => (
                                <Datepicker onChange={onChange} onBlur={onBlur} options={{ inputNameProp: "expire", inputIdProp: "expire" }} label='Expires' error={errors?.expire} name={name} />
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
                    <div className="flex flex-wrap mb-2">
                        <div className='w-full md:w-1/2 px-3'>
                            <FormSelect {...register("debtorId", {
                                valueAsNumber: true
                            })} label="Debtor" error={errors?.debtorId} disabled={loadingDebtors}>
                                {!loadingDebtors && debtorData?.map((debtor, index) => (
                                    <option key={index} value={debtor.id}>
                                        {debtor.name}
                                    </option>
                                ))}
                            </FormSelect>
                        </div>
                        <div className='w-full md:w-1/2 px-3 pt-7'>
                            <Button primary={false} onClick={showDebtorAddModal}>+</Button>
                        </div>
                    </div>
                </Form>
            </Card>
            <Modal modalConf={debtorAddModalConf} title="Add new Debtor" hasCloseBtn={true}>
                <DebtorAddForm onDebtorAdded={closeDebtorAddModal} />
            </Modal>
            <Modal modalConf={modalConf} title="Add more?" footer={<>
                <Button onClick={handleStayOnPage}>Yes</Button>
                <Button onClick={handleShowMyCase} primary={false}>No, show me my Case</Button>
            </>} hasCloseBtn={false}>
                Case successfully created! Do you want to add another one?
            </Modal>
        </main>
    );
}