import { FillingStatusEnum, QuarterQEnum } from "apps/api/src/common"

export type LproProgressType = {
    id: number,
    unit: string,
    type: string,
    status: string,
    jumlahArea: string,
    progress: {
        rcsa: LproProgressItemType,
        led: LproProgressItemType,
        iam: LproProgressItemType,
        kri: LproProgressItemType,
        all?: LproProgressItemType,
    },
    activities?: {
        unitKerja: string,
        activity: string,
        progress: number,
        approvalHistory: {
            status: string,
            user: string,
            date: Date
        }[]
    }[],
}

export type LproProgressItemType = {
    total: number,
    completed: number,
    percentage: number,
}

export type LproFollowUpType = {
    id: number,
    activity: string,
    workUnit: string,
    period: string,
    quarter: QuarterQEnum,
    progress: number,
    status: FillingStatusEnum,
    approvalHistory: ApprovalHistoryType,
}

export type CtImplementationType = {
    id: number,
    activity: string,
    workUnit: string,
    pic: string,
    progress: number,
    approvalHistory: ApprovalHistoryType,
}

export type CtFollowUpType = {
    id: number,
    activity: string,
    workUnit: string,
    followUp: string,
    dueDate: Date,
    overdue: Date,
    pic: string,
}

export type ApprovalHistoryType = {
    date: Date,
    user: string,
    status: string,
}