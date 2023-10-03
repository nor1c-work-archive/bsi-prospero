import { Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as env from 'env-var';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../../components/infrastructure/config/config';
import { JtwParser } from '../helper/jwt.helper';

require('dotenv').config({ path: Config.ENV_API_PATH });

interface AttachmentFileInterceptorOptions {
    fieldName: string;
    path?: string;
    filter?: any;
}

function AttachmentFileInterceptor(
    options: AttachmentFileInterceptorOptions,
): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        fileInterceptor: NestInterceptor;
        constructor() {
            const mainStorage = env
                .get('LOCAL_STORAGE_PATH')
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
                        const isRequireRename = env
                            .get('AUTO_RENAME_FILE_UPLOAD')
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
export default AttachmentFileInterceptor;
