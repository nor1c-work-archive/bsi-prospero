import { Controller, Get, Inject, Query, Req, Request } from "@nestjs/common";
import { MonitorToken } from "../monitor.token";
import { UserManagementServiceInterface } from "../interfaces/user-management.service.interface";
import { ApiOperation } from "@nestjs/swagger";
import { UserManagementOptionsDto } from "../dto/user-management.dto";
import { ApiResponse } from "libs/common/src";
import { ExtendedRequest } from "apps/api/src/common";
import { PageOptionsDto } from "apps/api/src/core";
import { MonitoringServiceInterface } from "../interfaces/monitoring.service.interface";
import { LPROService } from "../services/lpro.service";

@Controller('lpro')
export class LPROController {

    constructor(
        @Inject(MonitorToken.LPROServiceInterface.description)
        private readonly lproService: LPROService,
    ){}

    @Get('/')
    @ApiOperation({ summary: 'Get Find All Data' })
    async findAll(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.lproService.findAll(req,options);
        return ApiResponse.success(result);
    }

    @Get('/summary')
    @ApiOperation({ summary: 'Get Summary Data' })
    async summary(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.lproService.summary(req);
        return ApiResponse.success(result);
    }
}