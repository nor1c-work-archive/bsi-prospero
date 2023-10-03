export type CodeDescription = {
    code: number;
    message: string;
};

export class Code {
    // Common

    public static OK: CodeDescription = {
        code: 200,
        message: 'Success',
    };

    public static CREATED: CodeDescription = {
        code: 201,
        message: 'Created',
    };

    public static UPDATED: CodeDescription = {
        code: 204,
        message: 'Updated',
    };

    public static BAD_REQUEST_ERROR: CodeDescription = {
        code: 400,
        message: 'Bad request',
    };

    public static UNAUTHORIZED_ERROR: CodeDescription = {
        code: 401,
        message: 'Unauthorized error',
    };

    public static FORBIDDEN_RESOURCE: CodeDescription = {
        code: 403,
        message: 'Forbidden resource',
    };

    public static INTERNAL_SERVER_ERROR: CodeDescription = {
        code: 500,
        message: 'Internal server error',
    };

    public static ENTITY_VALIDATION_ERROR: CodeDescription = {
        code: 1001,
        message: 'Entity validation error',
    };
}
