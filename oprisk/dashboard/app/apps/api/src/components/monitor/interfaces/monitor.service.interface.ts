import { PageOptionsDto } from "apps/api/src/core";
import { MonitoringServiceInterface } from "./monitoring.service.interface";
import { ExtendedRequest } from "apps/api/src/common";
import { LproFollowUpDto, LproProgressDto, MonitorDto } from "../dto/monitor.dto";

export interface MonitorServiceInterface extends MonitoringServiceInterface {
    findAllProgressLpro(req: ExtendedRequest, options: LproProgressDto): Promise<any>
    findAllFollowUpLpro(req: ExtendedRequest, options: LproFollowUpDto): Promise<any>
    findAllCtImplementation(req: ExtendedRequest, options: MonitorDto): Promise<any>
    findAllFollowUpCt(req: ExtendedRequest, options: MonitorDto): Promise<any>
}