import { isArray } from 'lodash';
import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class DeleteFileOnErrorFilter implements ExceptionFilter {
    // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        // const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 400;

        console.log(request);
        const getFiles = (file: Express.Multer.File | unknown | undefined) => {
            if (!file) return [];
            if (isArray(file)) return file;
            return Object.values(file);
        };

        const filePaths = getFiles(request.files);
        console.log(filePaths);

        // for (const file of filePaths) {
        //     fs.unlink(file.path, (err) => {
        //         if (err) {
        //             console.error(err);
        //             return err;
        //         }
        //     });
        // }
        // response.status(status).json(exception.getResponse());

        // const ctx = host.switchToHttp();
        // const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        // const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
