import { EntityOpriskEnum, PeriodEnum, QuarterEnum } from 'apps/api/src/common'
import { IsEnum, IsOptional } from 'class-validator'

export class FilterDashboardIAMDto {
    @IsOptional()
    @IsEnum(EntityOpriskEnum)
    entity: EntityOpriskEnum;

    @IsOptional()
    region: string;

    @IsOptional()
    area: string;

    @IsOptional()
    group: string;

    @IsOptional()
    year: string;

    @IsOptional()
    quarter: QuarterEnum;

    @IsOptional()
    period: PeriodEnum;
}
