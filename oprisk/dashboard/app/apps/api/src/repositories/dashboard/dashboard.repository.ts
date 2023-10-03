import { ExtendedRequest } from 'apps/api/src/common'
import { AxiosError } from 'axios'
import * as env from 'env-var'
import { catchError, firstValueFrom } from 'rxjs'
import { Repository } from 'typeorm'

import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { DatabaseToken } from '../../components/infra/database/database.token'
import { IAMOrmEntity } from '../../core/typeorm/entities/IAM/IAM.orm.entity'
import { BaseAbstractRepository } from '../base/base.abstract.repository'

const BASE_URL = env.get('BASE_URL').required().asString();
const KRI_URL = env.get('KRI_URL').required().asString();

@Injectable()
export class DashboardRepository extends BaseAbstractRepository<IAMOrmEntity> {
    public Schema = DatabaseToken.Schema.description;

    constructor(
        private readonly httpService: HttpService,

        @InjectRepository(IAMOrmEntity)
        private readonly iamRepository: Repository<IAMOrmEntity>,
    ) {
        super(iamRepository);
    }

    public async findRCSA(req: ExtendedRequest, filter: string) {
        const dataRCSA = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/rcsa/risk-library-branch/dashboard?${filter}`,
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
        return dataRCSA;
    }

    public async findTopRisk(req: ExtendedRequest, filter: string) {
        const dataTopRisk = await firstValueFrom(
            this.httpService
                .get(`${BASE_URL}/rcsa/top-risk?${filter}`, {
                    headers: {
                        Authorization: `${req.header('Authorization')}`,
                    },
                })
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
        return dataTopRisk;
    }

    public async findKRI(req: ExtendedRequest, filter: string) {
        const dataKRI = await firstValueFrom(
            this.httpService
                .get(`${KRI_URL}/kri/indicator/risk-issue?${filter}`, {
                    headers: {
                        Authorization: `${req.header('Authorization')}`,
                    },
                })
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
        dataKRI.map((item) => {
            delete item.indicatorId;
        });
        return dataKRI;
    }

    public async findTrendAnalysis(req: ExtendedRequest, filter: string) {
        const dataTrendAnalysis = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/rcsa/risk-library-branch/dashboard?${filter}`,
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
        return dataTrendAnalysis.trendAnalytics ?? [];
    }

    public async findLEDMonthly(req: ExtendedRequest, filter: string) {
        const dataLedMonthly = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/led/loss-event/monthly-summary`,
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
        return dataLedMonthly
    }

    public async findLEDQuarter(req: ExtendedRequest, filter: string) {
        const dataLedQuarter = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/led/loss-event/quarterly-summary`,
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
        return dataLedQuarter
    }

    public async findCT(req: ExtendedRequest, filter: string) {
        const dataCT = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/ct/library/dashboard`,
                    {
                        headers: {
                            Authorization: `${req.header('Authorization')}`,
                        },
                        params: req.query || {}
                    },
                )
                .pipe(
                    catchError((error: AxiosError) => {
                        throw new HttpException(
                            error.message,
                            error.response?.status,
                        );
                    }),
                ),
        ).then((res) => res.data.data);

        return dataCT
    }

    public async findLEDByCause(req: ExtendedRequest, filter: string) {
        const dataLedCause = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/led/loss-event/summary-by-cause?${filter}`,
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
        return dataLedCause
    }

    public async findLEDByLET(req: ExtendedRequest, filter: string) {
        const dataLedByLET = await firstValueFrom(
            this.httpService
                .get(
                    `${BASE_URL}/led/loss-event/summary-by-loss-event-type`,
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
        return dataLedByLET
    }

    public async getIAM(req: ExtendedRequest, filter: string, year: string, quarter: string) {
        const queryBuilder = this.iamRepository.createQueryBuilder('t');

        queryBuilder.select('t.source, SUM(t.totalProgressActionPlan) as progress, SUM(t.totalDoneActionPlan) as done, SUM(t.totalProgressActionPlan+t.totalDoneActionPlan) as total');

        if (year && year != '') {
            queryBuilder.where(`YEAR(DATEADD(SECOND, t.createdAt / 1000, '19700101')) = ${year}`);
        }

        if (year && year != '' && quarter && quarter != '') {
            let startTimestamp, endTimestamp;
            const yearFilter = parseInt(year);

            switch (quarter) {
                case 'TW1':
                    startTimestamp = new Date(yearFilter, 0, 1).getTime(); // January 1st
                    endTimestamp = new Date(yearFilter, 2, 31, 23, 59, 59, 999).getTime(); // March 31st, 23:59:59.999
                    break;
                case 'TW2':
                    startTimestamp = new Date(yearFilter, 3, 1).getTime(); // April 1st
                    endTimestamp = new Date(yearFilter, 5, 30, 23, 59, 59, 999).getTime(); // June 30th, 23:59:59.999
                    break;
                case 'TW3':
                    startTimestamp = new Date(yearFilter, 6, 1).getTime(); // July 1st
                    endTimestamp = new Date(yearFilter, 8, 30, 23, 59, 59, 999).getTime(); // September 30th, 23:59:59.999
                    break;
                case 'TW4':
                    startTimestamp = new Date(yearFilter, 9, 1).getTime(); // October 1st
                    endTimestamp = new Date(yearFilter, 11, 31, 23, 59, 59, 999).getTime(); // December 31st, 23:59:59.999
                    break;
                default:
                    // Handle invalid quarterParam here.
                    console.error('Invalid quarterParam');
            }

            queryBuilder.where(`t.createdAt BETWEEN ${startTimestamp} AND ${endTimestamp}`);
        }

        // queryBuilder.where('t.source IS NOT NULL');

        queryBuilder.groupBy('t.source');

        let data = await queryBuilder.getRawMany();

        data = data.map(d => {
            d.percentage = Math.round(100*d.done/d.total)

            return d
        })

        return data;
    }

    public async getLproLed(req: ExtendedRequest, filter: string) {
        const dataRCSA = await firstValueFrom(
            this.httpService
                .get(
                    `https://api.pro-erms-staging.salt.id/oprisk/led/loss-event?${filter}`,
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

        return dataRCSA;
    }

    public async findLEDByFilter(req: ExtendedRequest, filter: string) {
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
        return dataLedByFilter
    }
}
