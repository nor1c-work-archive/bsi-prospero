import { EntityOpriskEnum, ExtendedRequest, QuarterEnum } from 'apps/api/src/common'
import { LPROEntity } from 'apps/api/src/core/domain/entities'
import * as env from 'env-var'

import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'

import { DatabaseToken } from '../../infra/database/database.token'
import { FilterDashboardCTDto } from '../dtos/filterCT.dto'
import { FilterDashboardIAMDto } from '../dtos/filterIAM.dto'
import { FilterDashboardLEDDto } from '../dtos/filterLED.dto'
import { FilterDashboardLPRODto } from '../dtos/filterLPRO.dto'
import { FilterDashboardLproLedDto } from '../dtos/filterLPROLED.dto'
import { FilterDashboardTADto } from '../dtos/filterTA.dto'
import { DashboardRepositoryInterface } from '../interface/dashboard.repository.interface'
import { DashboardServiceInterface } from '../interface/dashboard.service.interface'
import { DashboardToken } from '../tokens/dashboard.token'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'

const BASE_URL = env.get('BASE_URL').required().asString();
const KRI_URL = env.get('KRI_URL').required().asString();

@Injectable()
export class DashboardService implements DashboardServiceInterface {
    public SchemaName = DatabaseToken.Schema.description;
    public PrefixTable = DatabaseToken.DashboardTablePrefix.description;
    constructor(
        @Inject(DashboardToken.DashboardRepositoryInterface.description)
        private readonly dashboardRepositoryInterface: DashboardRepositoryInterface,

        private readonly httpService: HttpService,
    ) { }

    async findLPRO(
        req: ExtendedRequest,
        filterDashboardLPRODto: FilterDashboardLPRODto,
    ): Promise<any> {
        const filterRCSA = `unit=${filterDashboardLPRODto.entity === EntityOpriskEnum.REGION
            ? `Jaringan${!filterDashboardLPRODto.regionId
                ? ''
                : `&regionId=${filterDashboardLPRODto.regionId}`
            }${!filterDashboardLPRODto.areaId
                ? ''
                : `&areaId=${filterDashboardLPRODto.areaId}`
            }`
            : `Kantor Pusat${!filterDashboardLPRODto.groupId
                ? ''
                : `&groupId=${filterDashboardLPRODto.groupId}`
            }`
            }&year=${filterDashboardLPRODto.year}&quartal=${filterDashboardLPRODto.quarter === QuarterEnum.TW1
                ? 'q1'
                : filterDashboardLPRODto.quarter === QuarterEnum.TW2
                    ? 'q2'
                    : filterDashboardLPRODto.quarter === QuarterEnum.TW3
                        ? 'q3'
                        : 'q4'
            }`;
        const filterTopRisk = `unit=${filterDashboardLPRODto.entity === EntityOpriskEnum.REGION
            ? `Jaringan${!filterDashboardLPRODto.regionId
                ? ''
                : `&idRegional=${filterDashboardLPRODto.regionId}`
            }${!filterDashboardLPRODto.areaId
                ? ''
                : `&idArea=${filterDashboardLPRODto.areaId}`
            }`
            : `Kantor Pusat${!filterDashboardLPRODto.groupId
                ? ''
                : `&idgroup=${filterDashboardLPRODto.groupId}`
            }`
            }&year=${filterDashboardLPRODto.year}&quartal=${filterDashboardLPRODto.quarter === QuarterEnum.TW1
                ? 'Q1'
                : filterDashboardLPRODto.quarter === QuarterEnum.TW2
                    ? 'Q2'
                    : filterDashboardLPRODto.quarter === QuarterEnum.TW3
                        ? 'Q3'
                        : 'Q4'
            }`;
        const filterKRI = `threshold=THRESHOLD_RED,THRESHOLD_YELLOW,THRESHOLD_GREEN&eval=MAINTENANCE_ADMIN&entity=${filterDashboardLPRODto.entity === EntityOpriskEnum.REGION
            ? `NETWORK${!filterDashboardLPRODto.regionId
                ? ''
                : `&regionId=${filterDashboardLPRODto.regionId}`
            }${!filterDashboardLPRODto.areaId
                ? ''
                : `&areaId=${filterDashboardLPRODto.areaId}`
            }`
            : `HEADQUARTERS${!filterDashboardLPRODto.groupId
                ? ''
                : `&groupId=${filterDashboardLPRODto.groupId}`
            }`
            }&year=${filterDashboardLPRODto.year}&period=${filterDashboardLPRODto.quarter === QuarterEnum.TW1
                ? 'Q1'
                : filterDashboardLPRODto.quarter === QuarterEnum.TW2
                    ? 'Q2'
                    : filterDashboardLPRODto.quarter === QuarterEnum.TW3
                        ? 'Q3'
                        : 'Q4'
            }`;

        const dataRCSA = await this.dashboardRepositoryInterface.findRCSA(
            req,
            filterRCSA,
        );
        const dataTopRisk = await this.dashboardRepositoryInterface.findTopRisk(
            req,
            filterTopRisk,
        );
        const dataKRI = await this.dashboardRepositoryInterface.findKRI(
            req,
            filterKRI,
        );

        const dataLPROType = {
            compositeScoreRCSA: dataRCSA.compositeScore ?? null,
            riskMap: dataRCSA.riskMap ?? null,
            compositeRCSA: dataRCSA.compositeRCSA ?? null,
            topRisk: dataTopRisk ?? null,
            KRI: dataKRI ?? null,
            LED: [],
            IAM: {
                modules: [],
            },
        };
        return dataLPROType;
    }
    async findLED(
        req: ExtendedRequest,
        filterDashboardLEDDto: FilterDashboardLEDDto,
    ): Promise<any> {
        try {
            const filterLed = ''
            const dataLET = await this.dashboardRepositoryInterface.findLEDByLET(req, filterLed)

            let componentData = [];
            for (let i = 0; i < dataLET.length; i++) {
                //var dateInitial = new Date(dateData);
                const dateInitial = dataLET[i].reportingMonth;
                const splitDate = dateInitial.split('-');
                const year = splitDate[0]
                const month = splitDate[1]
                let monthText = '';

                switch (month) {
                    case '01': monthText = "Jan"; break;
                    case '02': monthText = "Feb"; break;
                    case '03': monthText = "Mar"; break;
                    case '04': monthText = "Apr"; break;
                    case '05': monthText = "May"; break;
                    case '06': monthText = "Jun"; break;
                    case '07': monthText = "Jul"; break;
                    case '08': monthText = "Aug"; break;
                    case '09': monthText = "Sep"; break;
                    case '10': monthText = "Okt"; break;
                    case '11': monthText = "Nov"; break;
                    case '12': monthText = "Dec"; break;
                }
                const eventData = {
                    name: dataLET[i].eventType,
                    realisasi: dataLET[i].totalLossNominal,
                    reportMonth: monthText
                };
                componentData.push(eventData);
            }

            const result = {
                dataTable: {
                    title: 'Loss Event Type KRO',
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Total'],
                    dataLET: [{
                        componentData: componentData.length === 0 ? [] : componentData
                    }]
                }
            }

            return result
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findLedMonthly(
        req: ExtendedRequest,
        filterDashboardLEDDto: FilterDashboardLEDDto,
    ): Promise<any> {
        try {
            const filter = ''
            const dataMonthly = await this.dashboardRepositoryInterface.findLEDMonthly(req, filter)

            let componentDataNominal = [];
            let componentDataEvent = [];
            for (let i = 0; i < dataMonthly.length; i++) {
                //var dateInitial = new Date(dateData);
                const dateInitial = dataMonthly[i].month;
                const splitDate = dateInitial.split('-');
                const year = splitDate[0]
                const month = splitDate[1]
                let monthText = '';

                switch (month) {
                    case '01': monthText = "Januari"; break;
                    case '02': monthText = "Februari"; break;
                    case '03': monthText = "Maret"; break;
                    case '04': monthText = "April"; break;
                    case '05': monthText = "Mei"; break;
                    case '06': monthText = "Juni"; break;
                    case '07': monthText = "Juli"; break;
                    case '08': monthText = "Agustus"; break;
                    case '09': monthText = "September"; break;
                    case '10': monthText = "Oktober"; break;
                    case '11': monthText = "November"; break;
                    case '12': monthText = "Desember"; break;
                }
                const nominalData = {
                    data: dataMonthly[i].totalLossNominal,
                    labels: monthText
                };
                const eventsData = {
                    data: dataMonthly[i].totalLossEvent,
                    labels: monthText
                };
                componentDataNominal.push(nominalData);
                componentDataEvent.push(eventsData);
            }

            const result = {
                title: 'LED Monthly',
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desemebr'],
                item: {
                    dataNominal: componentDataNominal.length === 0 ? [] : componentDataNominal,
                    dataEvent: componentDataEvent.length === 0 ? [] : componentDataEvent
                }
            }

            return result
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findLedQuarter(
        req: ExtendedRequest,
        filterDashboardCTDto: FilterDashboardCTDto,
    ): Promise<any> {
        try {
            const filter = ''
            const dataQuarter = await this.dashboardRepositoryInterface.findLEDQuarter(req, filter)

            let componentDataNominal = [];
            let componentDataEvent = [];
            for (let i = 0; i < dataQuarter.length; i++) {
                //var dateInitial = new Date(dateData);
                const quarterInitial = dataQuarter[i].quarter;
                let monthText = '';

                switch (quarterInitial) {
                    case 1: monthText = "Q1"; break;
                    case 2: monthText = "Q2"; break;
                    case 3: monthText = "Q3"; break;
                    case 4: monthText = "Q4"; break;
                }
                const nominalData = {
                    data: dataQuarter[i].totalLossNominal,
                    labels: monthText + ' ' + dataQuarter[i].year
                };
                const eventsData = {
                    data: dataQuarter[i].totalLossEvent,
                    labels: monthText + ' ' + dataQuarter[i].year
                };
                componentDataNominal.push(nominalData);
                componentDataEvent.push(eventsData);
            }

            const result = {
                title: 'LED',
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024' ],
                item: {
                    dataNominal: componentDataNominal.length === 0 ? [] : componentDataNominal,
                    dataEvent: componentDataEvent.length === 0 ? [] : componentDataEvent
                }
            }

            return result
        } catch (error) {
            throw new HttpException(
                'Method not implemented.',
                HttpStatus.NOT_IMPLEMENTED,
            );
        }
    }

    async findCT(
        req: ExtendedRequest,
        filterDashboardCTDto: FilterDashboardCTDto,
    ): Promise<any> {
        try {
            const filter = ''
            const dataQuarter = await this.dashboardRepositoryInterface.findCT(req, filter)

            return dataQuarter
        } catch (error) {
            throw new HttpException(
                'Method not implemented.',
                HttpStatus.NOT_IMPLEMENTED,
            );
        }
    }

    async findTA(
        req: ExtendedRequest,
        filterDashboardTADto: FilterDashboardTADto,
    ): Promise<any> {
        const filterRCSA = `unit=${filterDashboardTADto.entity === EntityOpriskEnum.REGION
            ? `Jaringan${!filterDashboardTADto.regionId
                ? ''
                : `&regionId=${filterDashboardTADto.regionId}`
            }${!filterDashboardTADto.areaId
                ? ''
                : `&areaId=${filterDashboardTADto.areaId}`
            }`
            : `Kantor Pusat${!filterDashboardTADto.groupId
                ? ''
                : `&groupId=${filterDashboardTADto.groupId}`
            }`
            }${filterDashboardTADto.startYear && filterDashboardTADto.endYear
                ? `&startYear=${filterDashboardTADto.startYear}&endYear=${filterDashboardTADto.endYear}`
                : ''
            }`;

        const dataRCSA =
            await this.dashboardRepositoryInterface.findTrendAnalysis(
                req,
                filterRCSA,
            );
        const dataTrendAnalysis = {
            dataRCSA: dataRCSA,
        };
        return dataTrendAnalysis;
    }

    async getIAM(
        req: ExtendedRequest,
        filterDashboardIAMDto: FilterDashboardIAMDto,
    ): Promise<any> {
        const filter = `year=${filterDashboardIAMDto.year}`;
        const dataIAM = await this.dashboardRepositoryInterface.getIAM(req, filter, filterDashboardIAMDto.year, filterDashboardIAMDto.quarter);

        return dataIAM;
    }

    async getLproLed(
        req: ExtendedRequest,
        filterDashboardLproLedDto: FilterDashboardLproLedDto,
    ): Promise<any> {
        const filter = ''
        const dataLproLed = await this.dashboardRepositoryInterface.getLproLed(req, filter);

        return dataLproLed;
    }

    async findLEDbyFilter(
        req: ExtendedRequest,
        FilterDashboardLEDDto : FilterDashboardLEDDto
    ) : Promise<any>{
        const dataLedByFilter = await firstValueFrom(
            this.httpService
                .get(
                    `https://api.pro-erms-staging.salt.id/oprisk/led/loss-event`,
                    {
                        headers: {
                            Authorization: `${req.header('Authorization')}`,
                        },
                    },
                )
                .pipe(
                    catchError((error: AxiosError) => {
                        console.log(error.toJSON());
                        throw new HttpException(
                            error.message,
                            error.response?.status,
                        );
                    }),
                ),
        ).then((res) => res.data.data);
        if (dataLedByFilter !== null) {
            dataLedByFilter.map((item) => item.data)

            const filteredData = dataLedByFilter.filter((item) => {
                if (req.query.area && item.area !== FilterDashboardLEDDto.area) {
                    return false;
                }
                if (FilterDashboardLEDDto.region && item.region !== FilterDashboardLEDDto.region) {
                    return false;
                }
                if (FilterDashboardLEDDto.year && item.year !== FilterDashboardLEDDto.year) {
                    return false;
                }
                return true;
            });
            return filteredData;
        }else{
            const filteredData = [];
            return filteredData;
        }
    }
}
