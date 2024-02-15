export enum Status {
    Opened = 0,
    Closed,
    Cancelled,
    Overdue
}

export type CreateCaseRequest = {
    description: string,
    status: Status,
    expire: Date
}

export type CaseDetails = {
    id: number,
    ownerId: string,
    created: string
} & CreateCaseRequest