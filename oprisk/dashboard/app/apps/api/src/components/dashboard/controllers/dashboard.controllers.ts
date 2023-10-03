import { ExtendedRequest } from 'apps/api/src/common'

import { ApiResponse } from '@app/common'
import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FilterDashboardCTDto } from '../dtos/filterCT.dto'
import { FilterDashboardIAMDto } from '../dtos/filterIAM.dto'
import { FilterDashboardLEDDto } from '../dtos/filterLED.dto'
import { FilterDashboardLPRODto } from '../dtos/filterLPRO.dto'
import { FilterDashboardLproLedDto } from '../dtos/filterLPROLED.dto'
import { FilterDashboardTADto } from '../dtos/filterTA.dto'
import { DashboardServiceInterface } from '../interface/dashboard.service.interface'
import { DashboardToken } from '../tokens/dashboard.token'

@ApiTags('Dashboard')
@Controller('')
export class DashboardController {
    constructor(
        @Inject(DashboardToken.DashboardServiceInterface.description)

        private readonly dashboardServiceInterface: DashboardServiceInterface,
    ) {}

    @Post('led')
    @ApiOperation({ summary: 'Get LED' })
    async findDashboardLED(
        @Query() filterDashboardLEDDto: FilterDashboardLEDDto,
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.dashboardServiceInterface.findLED(
            req,
            filterDashboardLEDDto,
        );
        return ApiResponse.success(result, null, null);
    }

    @Post('led-monthly')
    @ApiOperation({ summary: 'Get LED' })
    async findDashboardLEDMonthly(
        @Query() filterDashboardLEDDto: FilterDashboardLEDDto,
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.dashboardServiceInterface.findLedMonthly(req, filterDashboardLEDDto)
        return ApiResponse.success(result, null, null);
    }

    @Post('led-quarter')
    @ApiOperation({ summary: 'Get LED' })
    async findDashboardLEDQuarter(
        @Query() filterDashboardLEDDto: FilterDashboardLEDDto,
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.dashboardServiceInterface.findLedQuarter(req, filterDashboardLEDDto)
        return ApiResponse.success(result, null, null);
    }

    @Get('ct')
    @ApiOperation({ summary: 'Get CT' })
    async findDashboardCT(
        @Query() filterDashboardCTDto: FilterDashboardCTDto,
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.dashboardServiceInterface.findCT(
            req,
            filterDashboardCTDto,
        );
        return ApiResponse.success(result, null, null);
    }

    @Get('ta')
    @ApiOperation({ summary: 'Get TA' })
    async findDashboardTA(
        @Query() filterDashboardTADto: FilterDashboardTADto,
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.dashboardServiceInterface.findTA(
            req,
            filterDashboardTADto,
        );
        return ApiResponse.success(result, null, null);
    }

    @Get('iam')
    @ApiOperation({ summary: 'Get IAM' })
    async getIAMDashboard(
        @Query() filterDashboardIAMDto: FilterDashboardIAMDto,
        @Req() req: ExtendedRequest,
    ) {
        const result = await this.dashboardServiceInterface.getIAM(
            req,
            filterDashboardIAMDto,
        );
        return ApiResponse.success(result, null, null);
    }

    @Get('lpro-led')
    @ApiOperation({ summary: 'Get LED Chart' })
    async getLproLedDashboard(
        @Query() filterDashboardLproLedDto: FilterDashboardLproLedDto,
        @Req() req: ExtendedRequest,
    ) {
        let result = await this.dashboardServiceInterface.getLproLed(
            req,
            filterDashboardLproLedDto,
        );

        // transform data for FE
        const transformedData = [];
        const groupedData = {};
        let totalItemCount = 0;

        // filter by year
        if (
            filterDashboardLproLedDto.year &&
            filterDashboardLproLedDto.year != ''
        ) {
            const year = filterDashboardLproLedDto.year;

            result = result.filter((item) => {
                const eventDate = new Date(item.eventFirstDate);
                const itemYear = eventDate.getFullYear().toString();

                return itemYear == year;
            });
        }

        // filter by quartal
        if (
            filterDashboardLproLedDto.year &&
            filterDashboardLproLedDto.year != '' &&
            filterDashboardLproLedDto.quarter
        ) {
            const year = filterDashboardLproLedDto.year;
            const quarter = filterDashboardLproLedDto.quarter;

            result = result.filter((item) => {
                const eventDate = new Date(item.eventFirstDate);
                const itemYear = eventDate.getFullYear().toString();
                const itemQuarter = Math.ceil((eventDate.getMonth() + 1) / 3);
                const itemQuarterCode = `TW${itemQuarter}`;

                return itemYear === year && itemQuarterCode === quarter;
            });
        }

        result.forEach((item) => {
            if (
                item.kroGl._lossEventType != null &&
                item.kroGl._lossEventType.level1 != null
            ) {
                const groupName = item.kroGl._lossEventType.level1.name;
                const lossNominal = item.lossNominal;

                if (!groupedData[groupName]) {
                    groupedData[groupName] = {
                        totalLossNominal: 0,
                        itemCount: 0,
                    };
                }

                groupedData[groupName].totalLossNominal += lossNominal;
                groupedData[groupName].itemCount += 1;
                totalItemCount += 1;
            }
        });

        for (const groupName in groupedData) {
            const categoryData = groupedData[groupName];
            const percentage = Math.round((categoryData.itemCount / totalItemCount) * 100);

            transformedData.push({
                name: groupName,
                totalLossNominal: categoryData.totalLossNominal,
                itemCount: categoryData.itemCount,
                percentage: percentage,
            });
        }

        return ApiResponse.success(transformedData, null, null);
    }

    @Post('led-by-filter')
    @ApiOperation({summary: 'Get Led By Filter'})
    async getLEDByFilter( 
        @Query() filterDashboardLEDDto: FilterDashboardLEDDto,
        @Req() req: ExtendedRequest,) {
        const result = await this.dashboardServiceInterface.findLEDbyFilter(
            req,
            filterDashboardLEDDto
        )

        return ApiResponse.success(result, null, null)
    }
}
