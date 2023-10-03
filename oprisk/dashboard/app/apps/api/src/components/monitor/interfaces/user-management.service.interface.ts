import { ExtendedRequest } from "apps/api/src/common";
import { UserManagementOptionsDto } from "../dto/user-management.dto";

export interface UserManagementServiceInterface {
    findAll(req: ExtendedRequest, options: UserManagementOptionsDto)
}