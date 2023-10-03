import { Controller, Get, Inject, Query, Req, Request } from "@nestjs/common";
import { MonitorToken } from "../monitor.token";
import { UserManagementServiceInterface } from "../interfaces/user-management.service.interface";
import { ApiOperation } from "@nestjs/swagger";
import { UserManagementOptionsDto } from "../dto/user-management.dto";
import { ApiResponse } from "libs/common/src";
import { ExtendedRequest } from "apps/api/src/common";

@Controller('monitoring/user')
export class UserManagementController {

    constructor(
        @Inject(MonitorToken.UserManagementServiceInterface.description)
        private readonly userMgmntService: UserManagementServiceInterface,
    ){}

    @Get()
    @ApiOperation({ summary: 'Find all users' })
    async findAll(
        @Query() options: UserManagementOptionsDto, 
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.userMgmntService.findAll(req, options);

        return ApiResponse.success(result)
    }
}