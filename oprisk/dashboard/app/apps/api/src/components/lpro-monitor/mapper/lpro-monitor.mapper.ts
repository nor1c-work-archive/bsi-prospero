import { LproMonitorList } from "../types/lpro-monitor.type";

export class LproMonitorMapper {
    public static toDetail(payload: any): LproMonitorList {
        const response: LproMonitorList = {
            id: payload.id,
            lpro: payload.lpro,
            unit: payload.unit,
            period: payload.period,
            quartal: payload.quartal,
            status: payload.status,
        }
        return response
    }

    public static toList(payload: any[]): LproMonitorList[] {
        return payload.map(obj => this.toDetail(obj) )
    }
}