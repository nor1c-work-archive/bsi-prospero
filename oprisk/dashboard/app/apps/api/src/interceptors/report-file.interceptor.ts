// noinspection JSUnusedGlobalSymbols
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { config } from 'dotenv';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../components/infrastructure/config/config';
import { JtwParser } from '../common';

config({ path: Config.ENV_API_PATH });

const configService = new ConfigService();

interface ReportFileInterceptorOptions {
    fieldName: string;
    path?: string;
    filter?: any;
}

function ReportFileInterceptor(
    options: ReportFileInterceptorOptions,
): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        fileInterceptor: NestInterceptor;

        constructor() {
            const mainStorage = configService
                .get('MAIN_STORAGE_PATH')
                .required()
                .asString();

            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination: (req, file, callback) => {
                        const authorization = req.header('Authorization');
                        if (authorization) {
                            const user = JtwParser(authorization);
                            req.body.createdBy = user.sid;
                            req.body.createdByName = user.name;
                        }

                        const folder =
                            req.body?.type == 'MONTHLY'
                                ? '/monthly'
                                : '/weekly';
                        const path = mainStorage.concat(folder);

                        if (!fs.existsSync(path)) {
                            fs.mkdirSync(path, { recursive: true });
                        }

                        return callback(null, path);
                    },
                    filename: (req, file, callback) => {
                        const isRequireRename = configService
                            .get('FILE_UPLOAD_RENAME')
                            .required()
                            .asBool();
                        let fileName = `${file.originalname}`;
                        if (isRequireRename) {
                            const prefix = uuidv4();
                            const ext = extname(file.originalname);
                            fileName = `${prefix}${ext}`;
                        }
                        callback(null, fileName);
                    },
                }),
                fileFilter: options.filter,
            };

            this.fileInterceptor = new (FileInterceptor(
                options.fieldName,
                multerOptions,
            ))();
        }

        intercept(...args: Parameters<NestInterceptor['intercept']>) {
            return this.fileInterceptor.intercept(...args);
        }
    }

    return mixin(Interceptor);
}

// noinspection JSUnusedGlobalSymbols
export default ReportFileInterceptor;
