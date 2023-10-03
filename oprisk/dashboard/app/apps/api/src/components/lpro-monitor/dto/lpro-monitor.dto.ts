import { LevelUnitKerja, LproStatusEnum, QuarterEnum, QuarterQEnum, defaultMaximum, defaultMinimum, defaultPerPage } from "apps/api/src/common";
import { PageOptionsDto } from "apps/api/src/core";
import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator";

export class LproMonitorSaveDto {
    /**
    @IsNotEmpty()
    lpro: LevelUnitKerja

    @IsNotEmpty()
    unitId: number

    @IsNotEmpty()
    unitName: string

    @IsNotEmpty()
    quarter: QuarterQEnum

    @IsNotEmpty()
    period: number
     */
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    summary: string

    status?: LproStatusEnum
    submittedAt?: Date
    submittedBy?: string
    submittedByName?: string
}

export class LproMonitorOptions {
    @IsOptional()
    @IsString()
    readonly q: '';

    @Transform(({ value }) => parseInt(value))
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Transform(({ value }) => parseInt(value))
    @Type(() => Number)
    @IsInt()
    @Min(defaultMinimum)
    @Max(defaultMaximum)
    @IsOptional()
    readonly limit?: number = defaultPerPage;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }

    @IsOptional()
    year?: number

    @IsOptional()
    quartal?: QuarterQEnum;
}