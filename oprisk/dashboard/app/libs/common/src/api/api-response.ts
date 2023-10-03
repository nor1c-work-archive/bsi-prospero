import { PageMetaDto } from 'apps/api/src/core/typeorm/dtos/page-meta.dto';
import { Nullable } from '../type/common-types';
import { Code, CodeDescription } from '../code/code';

export class ApiResponse<TData> {
    public readonly status: object;

    public readonly data: Nullable<TData>;

    public readonly error: Nullable<string>;

    public readonly meta: PageMetaDto;

    private constructor(
        code: number,
        message: string | string[],
        data?: TData,
        pagination?: PageMetaDto,
        error?: string,
    ) {
        this.status = {
            code: code,
            message: message,
        };

        this.data = data || null || undefined;

        this.error = error || undefined;

        if (pagination) {
            this.meta = pagination;
        }
    }

    public static success<TData>(
        data?: TData,
        code?: number,
        message?: string,
        pagination?: PageMetaDto,
    ): ApiResponse<TData> {
        const resultCode: number = code || Code.OK.code;
        const resultMessage: string = message || Code.OK.message;
        return new ApiResponse(resultCode, resultMessage, data, pagination);
    }

    public static created<TData>(data?: TData): ApiResponse<TData> {
        return new ApiResponse(Code.CREATED.code, Code.CREATED.message, data);
    }

    public static error<TData>(
        code?: CodeDescription,
        message?: string[] | string,
    ): ApiResponse<TData> {
        const resultCode: number =
            code?.code ?? Code.INTERNAL_SERVER_ERROR.code;
        const resultMessage: string | string[] =
            message ?? code?.message ?? Code.INTERNAL_SERVER_ERROR.message;

        return new ApiResponse(
            resultCode,
            resultMessage,
            undefined,
            undefined,
            code?.message ?? Code.INTERNAL_SERVER_ERROR.message,
        );
    }
}
