// noinspection JSUnusedGlobalSymbols
export const ExcelFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
        req.excelValidationError = 'only excel file allowed';
        return callback(null, false);
    }

    return callback(null, true);
};
