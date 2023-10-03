import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
    EntityOpriskEnum,
    ExtendedRequest,
    QuarterEnum,
} from 'apps/api/src/common';
import { LPROEntity } from 'apps/api/src/core/domain/entities';
import * as env from 'env-var';
import { DatabaseToken } from '../../infra/database/database.token';
import { FilterDashboardCTDto } from '../dtos/filterCT.dto';
import { FilterDashboardLEDDto } from '../dtos/filterLED.dto';
import { FilterDashboardLPRODto } from '../dtos/filterLPRO.dto';
import { FilterDashboardTADto } from '../dtos/filterTA.dto';
import { DashboardRepositoryInterface } from '../interface/dashboard.repository.interface';
import { DashboardLproToken } from '../tokens/dashboardLpro.token';
import { DashboardLproServiceInterface } from '../interface/dashboardLpro.service.interface';
import { buffer } from 'stream/consumers';

const BASE_URL = env.get('BASE_URL').required().asString();
const KRI_URL = env.get('KRI_URL').required().asString();

@Injectable()
export class DashboardLproService implements DashboardLproServiceInterface {
    public SchemaName = DatabaseToken.Schema.description;
    public PrefixTable = DatabaseToken.DashboardTablePrefix.description;
    constructor(
        @Inject(DashboardLproToken.DashboardRepositoryInterface.description)
        private readonly dashboardRepositoryInterface: DashboardRepositoryInterface,

        private readonly httpService: HttpService,
    ) { }


    async findTopRisk(): Promise<any> {
        
        console.log("test");
     
    
        
        const region = {
            "region": "Region A",
            "value": 5.00,
          };
          
          const datatoprisk = [
            {
              "no": 1,
              "risiko": "Risiko Kesalahan Penagihan Nasabah",
              "ihrr": 1.00,
              "control": 1.00,
              "compositRisk": 1.00,
              "region" : region
            },
            {
              "no": 2,
              "risiko": "Risiko Lainnya",
              "ihrr": 2.50,
              "control": 1.75,
              "compositRisk": 4.375,
              "region" : region
            },
          ];
          
        return  datatoprisk ;
    }
}
