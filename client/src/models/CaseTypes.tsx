export enum Status {
    Opened = 0,
    Closed,
    Cancelled,
    Overdue
}

export type CaseDetails = {
    id: number,
    ownerId: string,
    created: string,
    description: string,
    status: Status,
    expire: Date
}