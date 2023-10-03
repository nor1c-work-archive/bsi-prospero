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
import { LEDService } from "../services/led.service";

@Controller('led')
export class LEDController {

    constructor(
        @Inject(MonitorToken.LEDServiceInterface.description)
        private readonly ledService: LEDService,
    ){}

    @Get('/')
    @ApiOperation({ summary: 'Get Find All Data' })
    async findAll(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.ledService.findAll(req,options);
        return ApiResponse.success(result);
    }

    @Get('/summary')
    @ApiOperation({ summary: 'Get Summary Data' })
    async summary(
        @Query() options: PageOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.ledService.summary(req);
        return ApiResponse.success(result);
    }
}