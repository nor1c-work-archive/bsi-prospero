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
import { RCSAService } from "../services/rcsa.service";

@Controller('rcsa')
export class RCSAController {

    constructor(
        @Inject(MonitorToken.RCSAServiceInterface.description)
        private readonly rcsaService: RCSAService,
    ){}

    @Get('/')
    @ApiOperation({ summary: 'Get Find All Data' })
    async findAll(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.rcsaService.findAll(req,options);
        return ApiResponse.success(result);
    }

    @Get('/summary')
    @ApiOperation({ summary: 'Get Summary Data' })
    async summary(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.rcsaService.summary(req);
        return ApiResponse.success(result);
    }
}