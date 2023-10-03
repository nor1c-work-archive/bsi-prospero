import { AuditOptionDto } from "../dto/audit.dto";

export interface AuditServiceInterface {
    findAll(options: AuditOptionDto): Promise<any>
    exportExcel(options: AuditOptionDto): Promise<any>
    exportPdf(options: AuditOptionDto): Promise<any>
}