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
import { KRIService } from "../services/kri.service";

@Controller('kri')
export class KRIController {

    constructor(
        @Inject(MonitorToken.KRIServiceInterface.description)
        private readonly kriService: KRIService,
    ){}

    @Get('/')
    @ApiOperation({ summary: 'Get Find All Data' })
    async findAll(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.kriService.findAll(req,options);
        return ApiResponse.success(result);
    }

    @Get('/summary')
    @ApiOperation({ summary: 'Get Summary Data' })
    async summary(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.kriService.summary(req);
        return ApiResponse.success(result);
    }
    @Get('/detail/:id')
    @ApiOperation({ summary: 'Get Detail'})
    async detail(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    )
    {
        const result = await this.kriService.findOne(req, options);
        return ApiResponse.success(result);
    }
}