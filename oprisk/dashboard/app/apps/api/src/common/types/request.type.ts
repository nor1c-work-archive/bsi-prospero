import { Request } from 'express';

export type ExtendedRequest = Request & {
    createdBy: string;
    createdByName: string;
    updatedBy: string;
    updatedByName: string;
    deletedBy: string;
    deletedByName: string;
};
