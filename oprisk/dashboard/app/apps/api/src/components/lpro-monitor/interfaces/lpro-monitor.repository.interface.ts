import { PageOptionsDto } from "apps/api/src/core";
import { LproOrmEntity } from "apps/api/src/core/typeorm/entities/monitor/lpro.orm.entity";
import { BaseRepositoryInterface } from "apps/api/src/repositories/base/base.repository.interface";
import { LproMonitorOptions } from "../dto/lpro-monitor.dto";

export interface LproMonitorRepositoryInterface extends BaseRepositoryInterface<LproOrmEntity> {
    findAllCustom(options: LproMonitorOptions)
}