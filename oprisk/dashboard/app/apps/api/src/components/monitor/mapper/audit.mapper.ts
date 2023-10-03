import { AuditType } from "../type/audit.type";

export class AuditMapper {
    public static toDetail(payload: any): AuditType {
        const response: AuditType = {
            id: payload.id,
            module: payload.module,
            user: payload.user,
            creationTime: payload.creationTime,
            action: payload.action,
            status: payload.status,
            detail: payload.detail,
        }
        return response
    }

    public static toList(payload: any[]): AuditType[] {
        return payload.map( obj => this.toDetail(obj))
    }
}