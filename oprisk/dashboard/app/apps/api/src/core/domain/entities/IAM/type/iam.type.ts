export type IamType = {
    id?: number;
    source?: string;
    externalSourceId?: number;
    description?: string;
    groupId?: number;
    totalProgressActionPlan?: number;
    totalDoneActionPlan?: number;
    pic?: string;

    createdAt?: Date;
    createdBy?: string;
    createdByName?: string;
    createdByEmail?: string;
    updatedAt?: Date;
    updatedBy?: string;
    updatedByName?: string;
    updatedByEmail?: string;
    deletedAt?: Date;
    deletedBy?: string;
    deletedByName?: string;
    deletedByEmail?: string;
    isDeleted?: number;
};
