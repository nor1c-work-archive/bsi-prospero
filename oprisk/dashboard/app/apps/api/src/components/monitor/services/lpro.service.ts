import { Inject, Injectable } from "@nestjs/common";
import { MonitoringServiceInterface } from "../interfaces/monitoring.service.interface";
import { ExtendedRequest } from "apps/api/src/common";
import { MonitorToken } from "../monitor.token";
import { SummaryResponse } from "@app/common";
import { PageOptionsDto } from "apps/api/src/core";

@Injectable()
export class LPROService implements MonitoringServiceInterface {

    constructor(
    ){}
    
    async summary(req: ExtendedRequest) : Promise<any> {
        const data = [{
            name : 'testing',
            completed : 30,
            total : 40,
            percentage: 40
        }];
        const result = SummaryResponse(data,'LPRO');
        return result;
    }

    async findAll(req: ExtendedRequest, options : PageOptionsDto) : Promise<any> {
        const result = [{
            "name" : "BankWide",
            "unit" : "All",
            "period": "Q1",
            "year": "2023",
            "status" : "APPROVED"
        },
        {
            "name" : "Direktorat",
            "unit" : "WBD",
            "period": "Q1",
            "year": "2023",
            "status" : "APPROVED"
        },{
            "name" : "Group",
            "unit" : "Regional Aceh",
            "period": "Q1",
            "year": "2023",
            "status" : "APPROVED"
        }];
        return result;
    }

    async findOne(req: ExtendedRequest, options : PageOptionsDto)  : Promise<any>{
        return '';
    }
}