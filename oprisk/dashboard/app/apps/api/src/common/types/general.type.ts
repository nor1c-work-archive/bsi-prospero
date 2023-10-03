import { HttpStatus } from '@nestjs/common';

// noinspection JSUnusedGlobalSymbols
export type ServiceResponse = {
    code: HttpStatus;
    message?: string;
    data?: any;
};
