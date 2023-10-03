import { FillingStatusEnum, QuarterQEnum } from "apps/api/src/common";
import { PageOptionsDto } from "apps/api/src/core";
import { IsOptional } from "class-validator";

export class MonitorDto {
    
    @IsOptional()
    region_kp: null;
    
    @IsOptional()
    area_group: null;
    
    @IsOptional()
    branch: null;

    @IsOptional()
    period: null;

    @IsOptional()
    quarter: QuarterQEnum;   
}

export class LproProgressDto extends MonitorDto {
    @IsOptional()
    segment: null;
}

export class LproFollowUpDto extends MonitorDto {
    @IsOptional()
    activity: FillingStatusEnum
}