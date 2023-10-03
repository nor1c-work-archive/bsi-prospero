import { Inject, Injectable } from "@nestjs/common";
import { MonitoringServiceInterface } from "../interfaces/monitoring.service.interface";
import { ExtendedRequest } from "apps/api/src/common";
import { MonitorToken } from "../monitor.token";
import { SummaryResponse } from "@app/common";
import { PageOptionsDto } from "apps/api/src/core";

@Injectable()
export class RCSAService implements MonitoringServiceInterface {

    constructor(
    ){}
    
    async summary(req: ExtendedRequest) : Promise<any> {
        const data = [{
            name : 'ALL AREA',
            completed : 1899,
            total : 40,
            percentage: 40
        },{
            name : 'REGION',
            completed : 30,
            total : 40,
            percentage: 40
        },{
            name : 'AREA',
            completed : 167,
            total : 40,
            percentage: 40
        },,{
            name : 'CABANG',
            completed : 30,
            total : 40,
            percentage: 40
        },,{
            name : 'GROUP',
            completed : 300,
            total : 40,
            percentage: 40
        },{
            name : 'DIREKTORAT',
            completed : 12312,
            total : 40,
            percentage: 40
        }];
        const result = SummaryResponse(data,'RCSA');
        return result;
    }

    async findAll(req: ExtendedRequest, options : PageOptionsDto) : Promise<any> {
        const result = [{
            "name" : "BankWide",
            "unit" : "All",
            "segment": "-",
            "period": "Q1",
            "year": "2023",
            "status" : "APPROVED"
        },
        {
            "name" : "Direktorat",
            "unit" : "WBD",
            "segment": "-",
            "period": "Q1",
            "year": "2023",
            "status" : "APPROVED"
        },{
            "name" : "Group",
            "unit" : "Regional Aceh",
            "segment": "-",
            "period": "Q1",
            "year": "2023",
            "status" : "APPROVED"
        }];
        return result;
    }

    async findOne(req: ExtendedRequest)  : Promise<any>{
        return '';
    }
}