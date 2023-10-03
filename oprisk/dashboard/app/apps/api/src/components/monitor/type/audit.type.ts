export type AuditType = {
    id: number,
    module: string,
    user: string,
    creationTime: Date,
    action: string,
    status: string,
    detail: string,
}