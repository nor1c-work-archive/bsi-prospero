import { Module } from "@nestjs/common";
import { LproMonitorController } from "./lpro-monitor.controller";
import { LproMonitorToken } from "./lpro-monitor.token";
import { LproMonitorService } from "./lpro-monitor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LproOrmEntity } from "../../core/typeorm/entities/monitor/lpro.orm.entity";
import { HttpModule } from "@nestjs/axios";
import { LproApprovalOrmEntity } from "../../core/typeorm/entities/monitor/lpro-approval.orm.entity";
import { LproMonitorRepository } from "../../repositories/lpro-monitor/lpro-monitor.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LproOrmEntity,
            LproApprovalOrmEntity,
        ]),
        HttpModule,
    ],
    controllers: [
        LproMonitorController,
    ],
    providers: [
        {
            provide: LproMonitorToken.LproMonitorServiceInterface.description,
            useClass: LproMonitorService,
        },
        {
            provide: LproMonitorToken.LproRepositoryInterface.description,
            useClass: LproMonitorRepository,
        }
    ]
})

export class LproMonitor {}