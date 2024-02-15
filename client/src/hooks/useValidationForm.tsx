import { Path, useForm } from "react-hook-form";

export type ValidationErrorInfo<T> = {
    errors: {
        [K in keyof T]?: string[]
    }
}

export default <T extends Record<string, any>>() => {
    const { register, handleSubmit, control, formState: { errors }, setError } = useForm<T>();

    const setApiValidationErrors = (errors: ValidationErrorInfo<T>) => {
        let property: keyof typeof errors.errors;
        for (property in errors.errors) {
            setError(property as Path<T>, { type: "api", message: errors.errors[property]?.join(' ') }, { shouldFocus: true })
        }
    }

    return { register, handleSubmit, control, errors, setApiValidationErrors }

}