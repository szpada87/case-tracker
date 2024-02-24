import { Status } from "../../models/CaseTypes";
import CaseStatus from "../CaseStatus/CaseStatus";
import classes from "./CaseDetailsCard.module.css"

type CaseDetailsProps = {
    id: number,
    owner: string,
    created: string,
    description: string,
    status: Status
}

function CaseDetailsCard({ id, owner, created, description, status }: CaseDetailsProps) {
    return (
        <div className={classes.case}>
            <div className={classes.avatar_wrapper}>
                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${owner}`} alt='' className={classes.avatar} />
            </div>

            <div className={classes.case_content}>
                <p className={classes.case_id}>
                    {id}
                    <small className={classes.timestamp}>{new Date(created).toLocaleDateString("en-US")}</small>
                    <CaseStatus status={status} />
                </p>
                <p className={classes.case_text}>{description}</p>
            </div>
        </div>
    );
}

export default CaseDetailsCard