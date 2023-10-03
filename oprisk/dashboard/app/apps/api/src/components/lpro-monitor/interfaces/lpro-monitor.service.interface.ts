import { PageOptionsDto } from "apps/api/src/core";
import { LproMonitorOptions, LproMonitorSaveDto } from "../dto/lpro-monitor.dto";

export interface LproMonitorServiceInterface {
    findAll(options: LproMonitorOptions): Promise<any>
    findOne(id: number): Promise<any>
    save(body: LproMonitorSaveDto): Promise<any>
}