import { Module } from "@nestjs/common";
import { UserManagementController } from "./controllers/user-management.controller";
import { MonitorToken } from "./monitor.token";
import { UserManagementService } from "./services/user-management.service";
import { UserManagementRepository } from "../../repositories/monitor/user-management.repository";
import { HttpModule } from "@nestjs/axios";
import { LPROController } from "./controllers/lpro.controller";
import { LPROService } from "./services/lpro.service";
import { CTController } from "./controllers/ct.controller";
import { CTService } from "./services/ct.service";
import { RCSAController } from "./controllers/rcsa.controller";
import { KRIController } from "./controllers/kri.controller";
import { LEDController } from "./controllers/led.controller";
import { IAMController } from "./controllers/iam.controller";
import { KRIService } from "./services/kri.service";
import { LEDService } from "./services/led.service";
import { IAMService } from "./services/iam.service";
import { RCSAService } from "./services/rcsa.service";
import { AuditController } from "./controllers/audit.controller";
import { AuditService } from "./services/audit.service";
import { MonitorController } from "./controllers/monitor.controller";
import { MonitorService } from "./services/monitor.service";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        UserManagementController,
        LPROController,
        CTController,
        KRIController,
        RCSAController,
        LEDController,
        IAMController,
        AuditController,
        MonitorController,
    ],
    providers: [
        {
            provide: MonitorToken.UserManagementServiceInterface.description,
            useClass: UserManagementService,
        },
        {
            provide: MonitorToken.UserManagementRepositoryInterface.description,
            useClass: UserManagementRepository,
        },
        {
            provide: MonitorToken.LPROServiceInterface.description,
            useClass: LPROService,
        },
        {
            provide: MonitorToken.CTServiceInterface.description,
            useClass: CTService,
        },
        {
            provide: MonitorToken.KRIServiceInterface.description,
            useClass: KRIService,
        },
        {
            provide: MonitorToken.LEDServiceInterface.description,
            useClass: LEDService,
        },
        {
            provide: MonitorToken.IAMServiceInterface.description,
            useClass: IAMService,
        },
        {
            provide: MonitorToken.RCSAServiceInterface.description,
            useClass: RCSAService,
        },
        {
            provide: MonitorToken.AuditServiceInterface.description,
            useClass: AuditService,
        },
        {
            provide: MonitorToken.MonitorServiceInterface.description,
            useClass: MonitorService,
        },
    ],
})
export class MonitorModule {}