import { Controller, Get, Inject, Query, Req } from "@nestjs/common";
import { MonitorToken } from "../monitor.token";
import { ExtendedRequest } from "apps/api/src/common";
import { PageOptionsDto } from "apps/api/src/core";
import { ApiResponse } from "@app/common";
import { MonitorServiceInterface } from "../interfaces/monitor.service.interface";
import { LproFollowUpDto, LproProgressDto, MonitorDto } from "../dto/monitor.dto";

@Controller('monitoring')
export class MonitorController {

    constructor(
        @Inject(MonitorToken.MonitorServiceInterface.description)
        private readonly monitorService: MonitorServiceInterface
    ){}

    @Get('progress-lpro')
    async findAllProgressLpro(
        @Query() options: LproProgressDto, 
        @Req() req: ExtendedRequest
    ) {
        const response = await this.monitorService.findAllProgressLpro(req, options)
        return ApiResponse.success(response)
    }

    @Get('follow-up-lpro')
    async findAllFollowUpLpro(
        @Query() options: LproFollowUpDto, 
        @Req() req: ExtendedRequest
    ){
        const response = await this.monitorService.findAllFollowUpLpro(req, options)
        return ApiResponse.success(response)
    }

    @Get('ct-implementation')
    async findAllCtImplementation(
        @Query() options: MonitorDto, 
        @Req() req: ExtendedRequest
    ){
        const response = await this.monitorService.findAllCtImplementation(req, options)
        return ApiResponse.success(response)
    }
    @Get('ct-implementation/summary')
    async findAllCtImplementationSummery(
        @Query() options: MonitorDto, 
        @Req() req: ExtendedRequest
    ){
        const response = await this.monitorService.findAllCtImplementation(req, options)
        return ApiResponse.success(response)
    }


    @Get('follow-up-ct')
    async findAllFollowUpCt(
        @Query() options: MonitorDto, 
        @Req() req: ExtendedRequest
    ){
        const response = await this.monitorService.findAllFollowUpCt(req, options)
        return ApiResponse.success(response)
    }
}