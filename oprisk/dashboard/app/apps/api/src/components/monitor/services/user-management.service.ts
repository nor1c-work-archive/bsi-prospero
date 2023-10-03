import { Inject, Injectable } from "@nestjs/common";
import { UserManagementServiceInterface } from "../interfaces/user-management.service.interface";
import { UserManagementOptionsDto } from "../dto/user-management.dto";
import { MonitorToken } from "../monitor.token";
import { UserManagementRepositoryInterface } from "../interfaces/user-management.repository.interface";
import { ExtendedRequest } from "apps/api/src/common";
import { UserManagementMapper } from "../mapper/user-management.mapper";

@Injectable()
export class UserManagementService implements UserManagementServiceInterface {

    constructor(
        @Inject(MonitorToken.UserManagementRepositoryInterface.description)
        private readonly userMgmtRepo: UserManagementRepositoryInterface,
    ){}
    
    async findAll(
        req: ExtendedRequest,
        options: UserManagementOptionsDto
    ) {
        let query = '';
        if (
            ('region' in options && options.region != '')
            || ('area' in options && options.area != '')
            || ('branch' in options && options.branch != '')
        ) {
            query = query.concat('?')
            if ('region' in options && options.region != '') query = query.concat(`region=${options.region}`)
            if ('area' in options && options.area != '') {
                if (query.length > 1) query = query.concat('&')
                query = query.concat(`area=${options.area}`)
            }
            if ('branch' in options && options.branch != '') {
                if (query.length > 1) query = query.concat('&')
                query = query.concat(`branch=${options.branch}`)
            }
        } 
        
        const response = await this.userMgmtRepo.findAll(req, query)
        
        const mapped = UserManagementMapper.toList(response)

        return mapped
    }
}