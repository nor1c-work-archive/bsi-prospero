import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Query, Req, Request } from "@nestjs/common";
import { LproMonitorToken } from "./lpro-monitor.token";
import { LproMonitorServiceInterface } from "./interfaces/lpro-monitor.service.interface";
import { PageOptionsDto } from "../../core";
import { ExtendedRequest } from "../../common";
import { ApiResponse } from "@app/common";
import { LproMonitorOptions, LproMonitorSaveDto } from "./dto/lpro-monitor.dto";

@Controller('lpro-monitor')
export class LproMonitorController {

    constructor(
        @Inject(LproMonitorToken.LproMonitorServiceInterface.description)
        private readonly lproService: LproMonitorServiceInterface
    ){}

    @Post('save')
    async save(
        @Body() body: LproMonitorSaveDto,
        @Request() req: any,
    ){
        body.submittedAt = req.body._date
        body.submittedBy = req.body.createdBy
        body.submittedByName = req.body.createdByName

        const response = await this.lproService.save(body)
        return ApiResponse.success(response)
    }

    @Get()
    async findAll(
        @Query() options: LproMonitorOptions,
        @Req() req: ExtendedRequest,
    ){
        const response = await this.lproService.findAll(options)
        return ApiResponse.success(response.data, HttpStatus.OK, 'Success', response.pagination)
    }

    @Get(':id')
    async findOne(
        @Param() param: any
    ){
        const id = param.id
        const response = await this.lproService.findOne(id)
        return ApiResponse.success(response)
    }

}