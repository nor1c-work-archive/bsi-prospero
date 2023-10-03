import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from '../enums/permission.enum';

// noinspection JSUnusedGlobalSymbols
export const Permissions = (...permissions: PermissionEnum[]) =>
    SetMetadata('RequirePermissions', permissions);
