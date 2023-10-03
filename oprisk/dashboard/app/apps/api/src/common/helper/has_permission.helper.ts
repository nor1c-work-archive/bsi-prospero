import { PermissionEnum } from '../enums/permission.enum';

export const hasPermission = (
    permissions: PermissionEnum[],
    requirePermissions: PermissionEnum[],
): boolean => {
    return (
        permissions !== undefined &&
        permissions.length > 0 &&
        permissions.some((val) => requirePermissions.includes(val))
    );
};
