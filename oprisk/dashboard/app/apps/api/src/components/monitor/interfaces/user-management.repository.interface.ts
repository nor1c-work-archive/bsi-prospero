import { ExtendedRequest } from "apps/api/src/common";
import { UserManagementOptionsDto } from "../dto/user-management.dto";

export interface UserManagementRepositoryInterface {
    findAll(req: ExtendedRequest, options: string): Promise<any>
}