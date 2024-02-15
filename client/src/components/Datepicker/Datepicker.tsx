import { useState } from "react"
import { IOptions } from "../Flowbite/DatePicker/Options"
import DatePicker from "../Flowbite/DatePicker/DatePicker"
import withLabel from "../FormInputs/withLabel"
import classes from "./Datepicker.module.css"

interface ITheme {
	background: string
	todayBtn: string
	clearBtn: string
	icons: string
	text: string
	disabledText: string
	input: string
	inputIcon: string
	selected: string
}

const DEFAULT_CONFIGURATION: Readonly<IOptions> = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    theme: { ...classes } as unknown as ITheme,
    datepickerClassNames: "top-auto",
    defaultDate: null,
    language: "en",
    disabledDates: [],
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}

type DatepickerProps = {
    onChange: (...event: any[]) => void,
    onBlur: (...event: any[]) => void,
    options: IOptions,
}

const DatepickerInput = (({ onChange, onBlur, options }: DatepickerProps) => {
    const [show, setShow] = useState(false)
    const handleClose = (state: boolean) => {
        setShow(state)
        if (!state)
            onBlur()
    }

    return <DatePicker options={{ ...DEFAULT_CONFIGURATION, ...options }} onChange={onChange} show={show} setShow={handleClose} />
})

export default withLabel(DatepickerInput);

