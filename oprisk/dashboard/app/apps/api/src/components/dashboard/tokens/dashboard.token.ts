export class DashboardToken {
    static readonly Dashboard: unique symbol = Symbol('Dashboard');
    static readonly DashboardServiceInterface: unique symbol = Symbol(
        'DashboardServiceInterface',
    );
    static readonly DashboardRepositoryInterface: unique symbol = Symbol(
        'DashboardRepositoryInterface',
    );
}
