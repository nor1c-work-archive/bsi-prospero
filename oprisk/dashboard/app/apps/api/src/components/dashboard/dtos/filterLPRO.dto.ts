import { EntityOpriskEnum, PeriodEnum, QuarterEnum } from 'apps/api/src/common';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class FilterDashboardLPRODto {
    @IsNotEmpty()
    @IsEnum(EntityOpriskEnum)
    entity: EntityOpriskEnum;

    @IsOptional()
    regionId: string;

    @IsOptional()
    areaId: string;

    @IsOptional()
    groupId: string;

    @IsNotEmpty()
    year: string;

    @IsNotEmpty()
    @IsEnum(QuarterEnum)
    quarter: QuarterEnum;

    @IsNotEmpty()
    @IsEnum(PeriodEnum)
    period: PeriodEnum;
}
