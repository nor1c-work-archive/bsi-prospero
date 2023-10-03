import { Controller, Get, HttpException, HttpStatus, Inject, Query, Res } from "@nestjs/common";
import { AuditOptionDto } from "../dto/audit.dto";
import { MonitorToken } from "../monitor.token";
import { AuditServiceInterface } from "../interfaces/audit.service.interface";
import { ApiResponse } from "@app/common";
import { Response } from "express";

@Controller('audit')
export class AuditController {

    constructor(
        @Inject(MonitorToken.AuditServiceInterface.description)
        private readonly auditService: AuditServiceInterface,
    ){}

    @Get()
    async findAll(
        @Query() options: AuditOptionDto
    ) {
        const response = await this.auditService.findAll(options)
        return ApiResponse.success(response)
    }

    @Get('excel')
    async exportExcel(
        @Query() options: AuditOptionDto,
        @Res() res: Response
    ) {
        const response = await this.auditService.exportExcel(options)
        if (!response.buffer) {
            throw new HttpException(`Failed to generate buffer`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename=${response.file}`,
            'Content-Length': response.buffer.length,
          });
      
        res.send(response.buffer);
    }

    @Get('pdf')
    async exportPdf(
        @Query() options: AuditOptionDto,
        @Res() res: Response
    ) {
        const response = await this.auditService.exportPdf(options)
        if (!response.buffer) {
            throw new HttpException(`Failed to generate buffer`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${response.file}`,
            'Content-Length': response.buffer.length,
          });
      
        res.send(response.buffer);
    }
}