import { Status } from "../../../models/CaseTypes";
import classes from "./CaseStatus.module.css";

const statusMap: string[] = [
    'status-info',
    'status-success',
    'status-warning',
    'status-danger',
]

type CaseStatusProps = {
    status: Status
}

function CaseStatus({ status }: CaseStatusProps) {
    return <span className={classes[statusMap[status]]}></span>;
}

export default CaseStatus