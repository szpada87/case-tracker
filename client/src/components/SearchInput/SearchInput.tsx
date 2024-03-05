import Loader from "../Loader/Loader";
import classes from "./SearchInput.module.css";

type SearchInputProps = {
    loading: boolean,
    q: string,
    onChange: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    placeholder: string

}

export const SearchInput = ({ loading, q, onChange, name, placeholder }: SearchInputProps) => {
    return <div className={classes.container}>
        <input value={q ?? ""} className={classes.field} type="search" name={name} placeholder={placeholder} onChange={onChange} />
        {loading && <Loader className={classes.spinner} />}
    </div>
}