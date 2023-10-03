import { ExtendedRequest } from 'apps/api/src/common';
import { FilterDashboardCTDto } from '../dtos/filterCT.dto';
import { FilterDashboardLEDDto } from '../dtos/filterLED.dto';
import { FilterDashboardLPRODto } from '../dtos/filterLPRO.dto';
import { FilterDashboardTADto } from '../dtos/filterTA.dto';

export interface DashboardLproServiceInterface {
    findTopRisk(): Promise<any>;

}
