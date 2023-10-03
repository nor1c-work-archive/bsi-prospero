import { ExtendedRequest } from "apps/api/src/common";
import { UserManagementOptionsDto } from "../dto/user-management.dto";
import { PageOptionsDto } from "apps/api/src/core";

export interface MonitoringServiceInterface {
    summary(req: ExtendedRequest) : Promise <any>;
    findAll(req: ExtendedRequest, options: PageOptionsDto): Promise <any>;
    findOne(req: ExtendedRequest, options: PageOptionsDto) : Promise <any>;
}