import { Link } from "react-router-dom";
import { Status } from "../../models/CaseTypes";
import classes from "./CaseCard.module.css"
import CaseStatus from "../CaseStatus/CaseStatus";

type CaseCardProps = {
    id: number,
    owner: string,
    created: string,
    description: string,
    status: Status
}

function CaseCard({ id, owner, created, description, status }: CaseCardProps) {
    return (
        <Link to={`/dashboard/cases/${id}`} className={classes.case}>
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
        </Link>
    );
}

export default CaseCard