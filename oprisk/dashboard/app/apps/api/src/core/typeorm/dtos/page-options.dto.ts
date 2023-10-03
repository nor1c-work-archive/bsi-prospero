import {
    EntityOpriskEnum,
    ListOrderEnum,
    PeriodEnum,
    QuarterEnum,
} from 'apps/api/src/common';
import {
    defaultMaximum,
    defaultMinimum,
    defaultPerPage,
} from 'apps/api/src/common/constants/page.constant';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageOptionsDto {
    @IsOptional()
    @IsString()
    readonly q: '';

    @IsOptional()
    @IsString()
    readonly id?: '';

    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    @IsEnum(ListOrderEnum)
    readonly order?: ListOrderEnum = ListOrderEnum.DESC;

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
    tag?: string;

    @IsOptional()
    entity?: EntityOpriskEnum;

    @IsOptional()
    region?: string;

    @IsOptional()
    area?: string;

    @IsOptional()
    headquarter?: string;

    @IsOptional()
    group?: string;

    @IsOptional()
    year?: number;

    @IsOptional()
    quarter?: QuarterEnum;

    @IsOptional()
    period?: PeriodEnum;

    @IsOptional()
    startYears?: number;

    @IsOptional()
    endYears?: number;
}
