import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { UserManagementRepositoryInterface } from "../../components/monitor/interfaces/user-management.repository.interface";
import * as env from 'env-var'
import { Config } from "../../components/infrastructure";
import { ExtendedRequest } from "../../common";
import { AxiosError, AxiosResponse } from "axios";
import { catchError, firstValueFrom, map } from "rxjs";
require('dotenv').config({ path: Config.ENV_API_PATH });

const USER_MGMT_URL = env.get('USER_MGMT_URL').required().asString();

@Injectable()
export class UserManagementRepository implements UserManagementRepositoryInterface {
    constructor(private readonly httpService: HttpService) {}

    async findAll(
        req: ExtendedRequest,
        query: string
    ) {
        let url = `${USER_MGMT_URL}/users/data/filter`
        if (query.length > 0) url = url.concat(query)

        const response = await firstValueFrom(
            this.httpService
                .get(
                    url,
                    {
                        headers: {
                            Authorization: `${req.header('Authorization')}`
                        }
                    }
                )
                .pipe(
                    catchError((error: AxiosError) => {
                        console.error(error.toJSON());
                        throw new HttpException(
                            error.message,
                            error.response?.status,
                        );
                    }),
                ),
        ).then((res: AxiosResponse) => {
            return res.data?.data
        })
        return response
    }
}