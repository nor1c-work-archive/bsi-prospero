import { CodeDescription } from '../code/code';
import { Optional } from '../type/common-types';

export type CreateExceptionPayload<TData> = {
    code: CodeDescription;
    overrideMessage?: string;
    data?: TData | string;
};

export class Exception<TData> extends Error {
    public readonly code: number;

    public readonly data: Optional<TData | string>;

    private constructor(
        codeDescription: CodeDescription,
        overrideMessage?: string,
        data?: TData | string,
    ) {
        super();
        this.name = this.constructor.name;
        this.code = codeDescription.code;
        this.data = data || codeDescription.message;
        this.message = overrideMessage || codeDescription.message;

        Error.captureStackTrace(this, this.constructor);
    }

    public static new<TData>(
        payload: CreateExceptionPayload<TData>,
    ): Exception<TData> {
        return new Exception(
            payload.code,
            payload.overrideMessage,
            payload.data,
        );
    }
}
