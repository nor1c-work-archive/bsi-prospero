import { LevelUnitKerja, LproStatusEnum, QuarterQEnum } from "apps/api/src/common";

export type LproType = {
    id?: number,
    lpro?: LevelUnitKerja;
    unitId?: number;
    unitName?: string;
    period?: number;
    quarter?: QuarterQEnum;
    status?: LproStatusEnum;
    summary: string;
    rcsaId?: number;
    iamId?: number;
    kriId?: number;
    ledId?: number;

    createdAt?: Date;
    createdBy?: string;
    createdByName?: string;
    updatedAt?: Date;
    updatedBy?: string;
    updatedByName?: string;
    deletedAt?: Date;
    deletedBy?: string;
    deletedByName?: string;
    isDeleted?: number;
}

export type LproApprovalType = {
    lpro: number;
    status: LproStatusEnum;
    createdBy: string;
    createdByName: string;
}