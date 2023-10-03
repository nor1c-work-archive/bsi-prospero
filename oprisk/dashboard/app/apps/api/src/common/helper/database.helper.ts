import { DatabaseToken } from '../../components/infra/database/database.token';

export const TableNaming = (name: string): string => {
    return `${DatabaseToken.DashboardTablePrefix.description}${name}`;
};
