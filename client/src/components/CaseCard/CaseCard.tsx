import { Link } from "react-router-dom";
import { CaseDetails, Status } from "../../models/CaseTypes";
import classes from "./CaseCard.module.css"
import CaseStatus from "../CaseStatus/CaseStatus";
import { Card } from "../Card/Card";
import { Avatar } from "../Avatar/Avatar";

type CaseCardProps = {
    caseData: CaseDetails
}

function CaseCard({ caseData }: CaseCardProps) {
    return (
        <Link to={`/dashboard/cases/${caseData.id}`}>
            <Card className={classes.card}>
                <div className={classes.case}>
                    <Avatar owner={caseData.ownerId} />
                    <div className={classes.case_content}>
                        <p className={classes.case_id}>
                            {caseData.id}
                            <small className={classes.timestamp}>{new Date(caseData.created).toLocaleDateString("en-US")}</small>
                            <CaseStatus status={caseData.status} />
                        </p>
                        <p className={classes.case_text}>{caseData.description}</p>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default CaseCard