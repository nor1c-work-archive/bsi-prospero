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
import { IAMService } from "../services/iam.service";

@Controller('iam')
export class IAMController {

    constructor(
        @Inject(MonitorToken.IAMServiceInterface.description)
        private readonly iamService: IAMService,
    ){}

    @Get('/')
    @ApiOperation({ summary: 'Get Find All Data' })
    async findAll(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.iamService.findAll(req,options);
        return ApiResponse.success(result);
    }

    @Get('/summary')
    @ApiOperation({ summary: 'Get Summary Data' })
    async summary(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.iamService.summary(req);
        return ApiResponse.success(result);
    }
    @Get('/detail/:id')
    @ApiOperation({ summary: 'Get Detail'})
    async detail(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    )
    {
        const result = await this.iamService.findOne(req, options);
        return ApiResponse.success(result);
    }
}