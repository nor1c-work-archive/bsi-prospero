import { CtFollowUpType, CtImplementationType, LproFollowUpType, LproProgressItemType, LproProgressType } from "../type/monitor.type";

export class MonitorMapper {
    public static toDetail(payload: any): LproProgressType {
        let progress = this.progresses(payload.progress)
        
        let response: LproProgressType = {
            id: payload.id,
            unit: payload.unit,
            type: payload.type,
            status: payload.status,
            jumlahArea: payload.jumlahArea,
            progress: progress,
        }
        if ('activities' in payload) {
            let activities = payload.activities.map(obj => {
                return this.activity(obj)
            })

            response = {...response, ...{ activities }}
        }

        return response
    }

    public static toList(payload: any[]): LproProgressType[] {
        return payload.map( obj => this.toDetail(obj))
    }

    public static progresses(payload: any) {
        let response = {
            rcsa: {
                total: payload.rcsa.total,
                completed: payload.rcsa.completed,
                percentage: payload.rcsa.percentage,
            },
            led: {
                total: payload.led.total,
                completed: payload.led.completed,
                percentage: payload.led.percentage,
            },
            kri: {
                total: payload.kri.total,
                completed: payload.kri.completed,
                percentage: payload.kri.percentage,
            },
            iam: {
                total: payload.iam.total,
                completed: payload.iam.completed,
                percentage: payload.iam.percentage,
            }
        }
        let all: LproProgressItemType = null
        if ('all' in payload) {
            all = {
                total: payload.all.total,
                completed: payload.all.completed,
                percentage: payload.all.percentage,
            }
        }
        response = {...response, ...{ all }}
        return response
    }

    public static activity(payload: any) {
        const response = {
            unitKerja: payload.unitKerja,
            activity: payload.activity,
            progress: payload.progress,
            approvalHistory: payload.approvalHistory
        }
        return response
    }

    public static toListFollowUpLpro(payload: any[]): LproFollowUpType[] {
        return payload.map( obj => {
            const response: LproFollowUpType = {
                id: obj.id,
                activity: obj.activity,
                workUnit: obj.workUnit,
                period: obj.period,
                quarter: obj.quarter,
                progress: obj.progress,
                status: obj.status,
                approvalHistory: obj.approvalHistory,
            }

            return response
        })
    }

    public static toListCtImplementation(payload: any[]): CtImplementationType[] {
        return payload.map( obj => {
            const response: CtImplementationType = {                
                id: obj.id,
                activity: obj.activity,
                workUnit: obj.workUnit,
                pic: obj.pic,
                progress: obj.progress,
                approvalHistory: obj.approvalHistory,
            }

            return response
        })
    }

    public static toListCtFollowUp(payload: any[]): CtFollowUpType[] {
        return payload.map( obj => {
            const response: CtFollowUpType = {                
                id: obj.id,
                activity: obj.activity,
                workUnit: obj.workUnit,
                followUp: obj.followUp,
                pic: obj.pic,
                dueDate: obj.dueDate,
                overdue: obj.overdue,
            }

            return response
        })
    }
}