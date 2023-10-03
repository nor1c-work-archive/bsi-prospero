import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuditServiceInterface } from "../interfaces/audit.service.interface";
import { AuditOptionDto } from "../dto/audit.dto";
import { AuditMapper } from "../mapper/audit.mapper";
import { Workbook } from "exceljs";

@Injectable()
export class AuditService implements AuditServiceInterface {
    
    constructor(){}

    async findAll(options: AuditOptionDto): Promise<any> {
        return AuditMapper.toList(DataDummy)
    }

    async exportExcel(options: AuditOptionDto): Promise<any> {
        let response = {
            file: null,
            buffer: null,
        }

        try {
            const workbook = new Workbook();
            response.file = 'report.xlsx';
            response.buffer = await workbook.xlsx.writeBuffer();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return response
    }

    async exportPdf(options: AuditOptionDto): Promise<any> {
        let response = {
            file: null,
            buffer: null,
        }

        try {
            const pdf = require('html-pdf');
            let tableHtml = `<table></table>`;
            const filename = 'report.pdf';
            const buffer = await new Promise<Buffer>((resolve, reject) => {
                pdf.create(tableHtml, {
                    format: 'A4',
                    orientation: 'landscape',
                    childProcessOptions: {
                        env: {
                        OPENSSL_CONF: '/dev/null',
                        },
                    }
                }).toBuffer((err, buffer) => {
                    if (err) {
                        console.error('Error generating PDF:', err);
                        reject(err);
                        return;
                    }
                    resolve(buffer);
                });
            });

            response.file = filename
            response.buffer = buffer
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return response
    }
}

const DataDummy = [
    {
        "id": 1,
        "module": "RCSA",
        "user": "Joro - Cabang Bandung",
        "creationTime": "2023-08-09 10:33:00",
        "action": "create",
        "status": "success",
        "detail": "Penambahan nilai baru rating likehood"
    },
    {
        "id": 2,
        "module": "KRI",
        "user": "Danang - Admin Risk",
        "creationTime": "2023-08-09 10:33:00",
        "action": "delete",
        "status": "failed",
        "detail": "Menghapus parameter"
    },
    {
        "id": 3,
        "module": "LED",
        "user": "Bayu - Super Admin",
        "creationTime": "2023-08-09 10:33:00",
        "action": "create",
        "status": "success",
        "detail": "Penambahan nilai baru rating likehood"
    },
    {
        "id": 4,
        "module": "CT",
        "user": "Dewi - Admin Maker",
        "creationTime": "2023-08-09 10:33:00",
        "action": "create",
        "status": "success",
        "detail": "Penambahan nilai baru rating likehood"
    },
    {
        "id": 5,
        "module": "IAM",
        "user": "Ayu - Admin Approver",
        "creationTime": "2023-08-09 10:33:00",
        "action": "edit",
        "status": "failed",
        "detail": "Perubahan status"
    }
]