import { IsOptional } from "class-validator";

export class UserManagementOptionsDto {
    @IsOptional()
    readonly region: null;

    @IsOptional()
    readonly area: null;

    @IsOptional()
    readonly branch: null;

    @IsOptional()
    readonly orderKey: null;

    @IsOptional()
    readonly order: null;
}