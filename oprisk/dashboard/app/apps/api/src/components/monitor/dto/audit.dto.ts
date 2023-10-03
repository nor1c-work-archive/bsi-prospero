import { IsOptional } from "class-validator";

export class AuditOptionDto {
    @IsOptional()
    readonly type: null

    @IsOptional()
    readonly start_date: null

    @IsOptional()
    readonly end_date: null
}