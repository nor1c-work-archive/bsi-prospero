// noinspection JSUnusedLocalSymbols
class ReportLogger {
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    constructor(message: string) {}
}

// noinspection JSUnusedGlobalSymbols
export class FormulaLogger extends ReportLogger {
    constructor(message: string) {
        super(message);
    }
}
