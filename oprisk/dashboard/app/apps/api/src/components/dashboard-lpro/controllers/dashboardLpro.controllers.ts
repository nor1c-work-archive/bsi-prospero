import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardLproToken } from '../tokens/dashboardLpro.token';
import { DashboardLproServiceInterface } from '../interface/dashboardLpro.service.interface';
import { ApiResponse } from '@app/common';
import { ExtendedRequest } from 'apps/api/src/common';

@ApiTags('Dashboard-lpro')
@Controller('dashboar-lpro')
export class DashboardLproController {
    constructor(
        @Inject(DashboardLproToken.DashboardLproServiceInterface.description)

        private dashboardLproServiceInterface : DashboardLproServiceInterface,
    ) {}

    @Get('lpro/toprisk')
    async findDashboardLPRO() { 
        console.log("result");
        const result = await this.dashboardLproServiceInterface.findTopRisk();
        return ApiResponse.success(result);
    }

   
}
