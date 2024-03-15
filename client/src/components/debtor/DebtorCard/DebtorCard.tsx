import classes from "./DebtorCard.module.css"
import { Card } from "../../common/Card/Card";
import { DebtorDetailsResponse } from "../../../shared/api/axios-client";

type DebtorCardProps = {
    debtorData: DebtorDetailsResponse
}

function DebtorCard({ debtorData }: DebtorCardProps) {
    return (
        <Card>
            <div className={classes.debtor}>
                <div className={classes.debtor_content}>
                    <p className={classes.label}>Debtor details:</p>
                    <p className={classes.debtor_text}>{debtorData.name}</p>
                </div>
            </div>
        </Card>
    );
}

export default DebtorCard