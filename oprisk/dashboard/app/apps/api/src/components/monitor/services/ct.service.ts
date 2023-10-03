import { Inject, Injectable } from "@nestjs/common";
import { MonitoringServiceInterface } from "../interfaces/monitoring.service.interface";
import { ExtendedRequest } from "apps/api/src/common";
import { MonitorToken } from "../monitor.token";
import { SummaryResponse } from "@app/common";
import { PageOptionsDto } from "apps/api/src/core";

@Injectable()
export class CTService implements MonitoringServiceInterface {

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
        const result = SummaryResponse(data,'CT');
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

    async findOne(req: ExtendedRequest, options : PageOptionsDto)  : Promise<any>{
        const result = [{
            "A" : { 
                "keyProcess" : "Inisiasi",
                "no" : 1,
                "keyRisk": "Risiko kesalahan akuisisi calon nasabah pembiayaan",
                "keyControll" : "Petugas memastikan target market telah sesuai ketentuan sbb.: a. Golbertap (1) Pegawai tetap (2) Pensiunan",
                "ketentuan": "1. PTO Layanan BSI Prioritas (10 Juni 2022) 2. BAB III - Layanan BSI Prioritas",
                "ContohTestingScript" : "1. PTO Layanan BSI Prioritas (10 Juni 2022) 2. BAB III - Layanan BSI Prioritas"

            },
            
        }];
        return result;
    }
}