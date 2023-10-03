import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IAMOrmEntity } from '../../core/typeorm/entities/IAM/IAM.orm.entity'
import { DashboardRepository } from '../../repositories'
import { DashboardController } from './controllers/dashboard.controllers'
import { DashboardService } from './services/dashboard.service'
import { DashboardToken } from './tokens/dashboard.token'

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([
            IAMOrmEntity,
        ])
    ],
    controllers: [DashboardController],
    providers: [
        {
            provide: DashboardToken.DashboardRepositoryInterface.description,
            useClass: DashboardRepository,
        },
        {
            provide: DashboardToken.DashboardServiceInterface.description,
            useClass: DashboardService,
        },
    ],
})
export class DashboardModule {}
