import { EntityOpriskEnum } from 'apps/api/src/common';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterDashboardLEDDto {
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
}
