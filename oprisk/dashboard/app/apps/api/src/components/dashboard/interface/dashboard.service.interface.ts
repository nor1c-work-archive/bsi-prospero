import { ExtendedRequest } from 'apps/api/src/common'

import { FilterDashboardCTDto } from '../dtos/filterCT.dto'
import { FilterDashboardIAMDto } from '../dtos/filterIAM.dto'
import { FilterDashboardLEDDto } from '../dtos/filterLED.dto'
import { FilterDashboardLPRODto } from '../dtos/filterLPRO.dto'
import { FilterDashboardLproLedDto } from '../dtos/filterLPROLED.dto'
import { FilterDashboardTADto } from '../dtos/filterTA.dto'

export interface DashboardServiceInterface {
    findLPRO(
        req: ExtendedRequest,
        filterDashboardLPRODto: FilterDashboardLPRODto,
    ): Promise<any>;

    findLED(
        req: ExtendedRequest,
        filterDashboardLEDDto: FilterDashboardLEDDto,
    ): Promise<any>;

    findCT(
        req: ExtendedRequest,
        filterDashboardCTDto: FilterDashboardCTDto,
    ): Promise<any>;

    findTA(
        req: ExtendedRequest,
        filterDashboardTADto: FilterDashboardTADto,
    ): Promise<any>;

    findLedMonthly(
        req: ExtendedRequest,
        filterDashboardLEDDto: FilterDashboardLEDDto,
    ): Promise<any>;

    findLedQuarter(
        req: ExtendedRequest,
        filterDashboardCTDto: FilterDashboardLEDDto,
    ): Promise<any>;

    getIAM(
        req: ExtendedRequest,
        filterDashboardIAMDto: FilterDashboardIAMDto,
    ): Promise<any>;

    getLproLed(
        req: ExtendedRequest,
        filterDashboardLproLedDto: FilterDashboardLproLedDto,
    ): Promise<any>;

    findLEDbyFilter(
        req: ExtendedRequest,
        filterDashboardLEDDto: FilterDashboardLEDDto,
    ): Promise<any>
}
