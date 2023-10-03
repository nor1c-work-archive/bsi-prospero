export class MonitorToken {
    static readonly UserManagementServiceInterface: unique symbol = Symbol('UserManagementServiceInterface');
    static readonly AuditServiceInterface: unique symbol = Symbol('AuditServiceInterface');
    static readonly MonitoringServiceInterface: unique symbol = Symbol('MonitoringServiceInterface');
    static readonly MonitorServiceInterface: unique symbol = Symbol('MonitorServiceInterface');
    static readonly LPROServiceInterface: unique symbol = Symbol('LPROServiceInterface');
    static readonly CTServiceInterface: unique symbol = Symbol('CTServiceInterface');
    static readonly RCSAServiceInterface: unique symbol = Symbol('RCSAServiceInterface');
    static readonly KRIServiceInterface: unique symbol = Symbol('KRIServiceInterface');
    static readonly IAMServiceInterface: unique symbol = Symbol('IAMServiceInterface');
    static readonly LEDServiceInterface: unique symbol = Symbol('LEDServiceInterface');

    
    static readonly UserManagementRepositoryInterface: unique symbol = Symbol('UserManagementRepositoryInterface');
}