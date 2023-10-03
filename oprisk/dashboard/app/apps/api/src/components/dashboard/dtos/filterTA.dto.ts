import { EntityOpriskEnum } from 'apps/api/src/common';
import { IsEnum, IsOptional } from 'class-validator';
export class FilterDashboardTADto {
    @IsOptional()
    @IsEnum(EntityOpriskEnum)
    entity: EntityOpriskEnum;

    @IsOptional()
    regionId: string;

    @IsOptional()
    areaId: string;

    @IsOptional()
    groupId: string;

    @IsOptional()
    startYear: string;

    @IsOptional()
    endYear: string;
}
