import classes from "./CaseCard.module.css"
import CaseStatus from "../CaseStatus/CaseStatus";
import { Card } from "../Card/Card";
import { Avatar } from "../Avatar/Avatar";
import { CaseDetailsResponse } from "../../shared/api/axios-client";

type CaseCardProps = {
    caseData: CaseDetailsResponse
}

function CaseCard({ caseData }: CaseCardProps) {
    return (
        <Card>
            <div className={classes.case}>
                <Avatar owner={caseData.ownerId!} />
                <div className={classes.case_content}>
                    <p className={classes.case_id}>
                        {caseData.id}
                        <small className={classes.timestamp}>{new Date(caseData.created!).toLocaleDateString("en-US")}</small>
                        <CaseStatus status={caseData.status!} />
                    </p>
                    <p className={classes.case_text}>{caseData.description}</p>
                </div>
            </div>
        </Card>
    );
}

export default CaseCard