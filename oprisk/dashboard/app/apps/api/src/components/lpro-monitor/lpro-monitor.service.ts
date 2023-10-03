import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { LproMonitorServiceInterface } from "./interfaces/lpro-monitor.service.interface";
import { PageOptionsDto } from "../../core";
import { LproMonitorMapper } from "./mapper/lpro-monitor.mapper";
import { LproMonitorOptions, LproMonitorSaveDto } from "./dto/lpro-monitor.dto";
import { LproApprovalType, LproType } from "../../core/domain/entities";
import { LproStatusEnum } from "../../common";
import { LproMonitorToken } from "./lpro-monitor.token";
import { InjectDataSource } from "@nestjs/typeorm";
import { LproApprovalOrmEntity } from "../../core/typeorm/entities/monitor/lpro-approval.orm.entity";
import { LproOrmEntity } from "../../core/typeorm/entities/monitor/lpro.orm.entity";
import { LproMonitorRepositoryInterface } from "./interfaces/lpro-monitor.repository.interface";
import { LproMapper } from "../../core/typeorm/entities/monitor/mapper/lpro.mapper";

@Injectable()
export class LproMonitorService implements LproMonitorServiceInterface {
    private readonly logger = new Logger(LproMonitorService.name)

    constructor(
        @Inject(LproMonitorToken.LproRepositoryInterface.description)
        private readonly lproRepository: LproMonitorRepositoryInterface,

        @InjectDataSource()
        private readonly dataSource,
    ){}

    async findAll(
        options: LproMonitorOptions
    ): Promise<any> {
        const lpro = await this.lproRepository.findAllCustom(options);
        const mapped = LproMapper.toDomainEntities(lpro.data)
        return {
            data: mapped,
            pagination: lpro.pagination,
        }
    }

    async findOne(id: number): Promise<any> {
        const find = await this.lproRepository.findOneById(id)
        if (!find) {
            throw new HttpException(`Data not found.`, HttpStatus.NOT_FOUND)
        }

        if (find.status == LproStatusEnum.NEW) {
            throw new HttpException(`Data incomplete.`, HttpStatus.FORBIDDEN)
        }

        // get data rcsa
        // get data kri
        // get data led
        // get data iam
        
        return LproMapper.toDomain(find)
    }

    async save(body: LproMonitorSaveDto): Promise<any> {
        // validation
        const find = await this.lproRepository.findOneById(body.id)
        if (!find) {
            throw new HttpException(`Data not found.`, HttpStatus.NOT_FOUND)
        }

        if (find.status == LproStatusEnum.NEW) {
            throw new HttpException(`Data incomplete.`, HttpStatus.FORBIDDEN)
        }

        if (find.status == LproStatusEnum.APPROVED) {
            throw new HttpException(`Cannot approve data that has been approved.`, HttpStatus.FORBIDDEN)
        }

        if (find.rcsaId == null || find.kriId == null || find.ledId == null || find.iamId == null) {
            throw new HttpException(`Data invalid.`, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.startTransaction()
        try {
            const payload: LproType = {
                summary: body.summary,
                status: LproStatusEnum.APPROVED,
            }
            await queryRunner.manager.update(LproOrmEntity, body.id, payload)
            .then( async (result) => {
                const approval: LproApprovalType = {
                    lpro: body.id,
                    status: LproStatusEnum.APPROVED,
                    createdBy: body.submittedBy,
                    createdByName: body.submittedByName,
                }  
                await queryRunner.manager.insert(LproApprovalOrmEntity, approval)
            })
            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction()
            this.logger.error(`Failed to save. ${error}`)
            throw new HttpException(`Failed to save. ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            await queryRunner.release()
        }
        return find
    }
}

const DataDummy = [
    {
        id: 1,
        lpro: 'regional',
        unit: 'regional jawa timur',
        period: 2022,
        quartal: 'Q1',
        status: 'APPROVED',
    },
    {
        id: 2,
        lpro: 'regional',
        unit: 'regional jawa tengah',
        period: 2022,
        quartal: 'Q1',
        status: 'DRAFTED',
    },
    {
        id: 3,
        lpro: 'area',
        unit: 'area surabaya',
        period: 2022,
        quartal: 'Q1',
        status: 'APPROVED',
    },
    {
        id: 4,
        lpro: 'area',
        unit: 'area malang',
        period: 2022,
        quartal: 'Q1',
        status: 'DRAFTED',
    },
    {
        id: 5,
        lpro: 'directorat',
        unit: 'IAM Directorat',
        period: 2022,
        quartal: 'Q1',
        status: 'APPROVED',
    },
    {
        id: 6,
        lpro: 'department',
        unit: 'Operational Risk',
        period: 2022,
        quartal: 'Q1',
        status: 'DRAFTED',
    }
]