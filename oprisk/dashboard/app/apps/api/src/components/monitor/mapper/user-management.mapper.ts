import { UserType } from "../type/user.type";

export class UserManagementMapper {
    public static toDetail(payload: any) {
        const response: UserType = {
            id: payload.id,
            nip: payload.employeeNumber,
            fullName: payload.name,
            position: payload.jobTitle,
            workUnit: payload.workUnit,
            status: payload.status,
        }
        return response
    }

    public static toList(payload: any[]){
        return payload.map( obj => this.toDetail(obj))
    }
}