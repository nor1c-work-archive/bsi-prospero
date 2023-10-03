import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
//import { fileTypeFromFile } from 'file-type';
// const FileType = require('file-type');

import * as fs from 'fs';
import { Observable, from, of, switchMap } from 'rxjs';

type validFileExtension = 'png' | 'jpg' | 'jpeg' | 'gif';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg' | 'image/gif';

const validFileExtensions: validFileExtension[] = [
    'png',
    'jpeg',
    'jpeg',
    'gif',
];
const validMimeTypes: validMimeType[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
];

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const saveImageToStorage = {
    storage: diskStorage({
        destination: './files/images',
        filename: (req, file, cb) => {
            const fileExtension: string = path.extname(file.originalname);
            const fileName: string = uuidv4() + fileExtension;
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes: validMimeType[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(null, false);
    },
    // fileFilter: imageFileFilter,
};

export const removeFile = (fullFilePath: string): void => {
    try {
        fs.unlinkSync(fullFilePath);
    } catch (error) {
        console.log(error);
    }
};

/* export const isFileExtensionSafe = (fullFilePath: string): Observable<boolean> => {
    return from(fileTypeFromFile(fullFilePath)).pipe(
        switchMap((fileExtensionAndMimeType) => {
            if (!fileExtensionAndMimeType) return of(false);
        })
    )
} */

// if (!fileExtensionAndMimeType) return of(false);
// const isFileTypeLegit = validFileExtensions.includes(
//     fileExtensionAndMimeType.ext
// );
// const isMimeTypeLegit = validMimeTypes.includes(
//     fileExtensionAndMimeType.mime
// );

// const isFileLegit = isFileTypeLegit && isMimeTypeLegit;
// return of(isFileLegit)
