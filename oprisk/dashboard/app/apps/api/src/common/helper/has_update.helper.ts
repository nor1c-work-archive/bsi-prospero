export const hasUpdate = (originalObj: any, updatedObj: any): boolean => {
    for (const key in updatedObj) {
        if (updatedObj.hasOwnProperty(key)) {
            if (
                updatedObj[key] !== undefined &&
                originalObj[key] !== undefined &&
                updatedObj[key] != originalObj[key]
            ) {
                return true; // There is an update
            }
        }
    }
    return false; // No update
};
