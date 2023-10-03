import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IAMOrmEntity } from '../../core/typeorm/entities/IAM/IAM.orm.entity'
import { DashboardRepository } from '../../repositories'
import { DashboardLproController } from './controllers/dashboardLpro.controllers'
import { DashboardLproService } from './services/dashboardLpro.service'
import { DashboardLproToken } from './tokens/dashboardLpro.token'

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([IAMOrmEntity])],
    controllers: [DashboardLproController],
    providers: [
        {
            provide: DashboardLproToken.DashboardRepositoryInterface.description,
            useClass: DashboardRepository,
        },
        {
            provide: DashboardLproToken.DashboardLproServiceInterface.description,
            useClass: DashboardLproService,
        },
    ],
})
export class DashboardLproModule {}
