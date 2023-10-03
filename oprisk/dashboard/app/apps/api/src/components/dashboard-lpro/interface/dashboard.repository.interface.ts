import { ExtendedRequest } from 'apps/api/src/common';

export interface DashboardRepositoryInterface {
    findRCSA(req: ExtendedRequest, filter: string): Promise<any>;
    findTopRisk(req: ExtendedRequest, filter: string): Promise<any>;
    findKRI(req: ExtendedRequest, filter: string): Promise<any>;
    findTrendAnalysis(req: ExtendedRequest, filter: string): Promise<any>;
    findLEDMonthly(req: ExtendedRequest, filter: string): Promise<any>;
    findLEDQuarter(req: ExtendedRequest, filter: string): Promise<any>;
    findCT(req: ExtendedRequest, filter: string): Promise<any>;
    findLEDByCause(req: ExtendedRequest, filter: string): Promise<any>;
    findLEDByLET(req: ExtendedRequest, filter: string): Promise<any>;
}
