import { InjectRepository } from "@nestjs/typeorm";;
import { LproOrmEntity } from "../../core/typeorm/entities/monitor/lpro.orm.entity";
import { BaseAbstractRepository } from "../base/base.abstract.repository";
import { FindManyOptions, Repository } from "typeorm";
import { LproMonitorRepositoryInterface } from "../../components/lpro-monitor/interfaces/lpro-monitor.repository.interface";
import { PageDto, PageMetaDto, PageOptionsDto } from "../../core";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject } from "@nestjs/common";
import { LproStatusEnum } from "../../common";
import { LproMonitorOptions } from "../../components/lpro-monitor/dto/lpro-monitor.dto";

export class LproMonitorRepository 
    extends BaseAbstractRepository<LproOrmEntity> 
    implements LproMonitorRepositoryInterface
{
    constructor(
        @InjectRepository(LproOrmEntity)
        private readonly repository: Repository<LproOrmEntity>,

        @Inject(REQUEST)
        private readonly request: Request
    ){
        super(repository)
    }
    
    async findAllCustom(pageOptionsDto: LproMonitorOptions): Promise<PageDto<LproOrmEntity>> {
        const tableName = this.repository.metadata.tableName;
        const schema = this.repository.metadata.schema;

        const queryBuilder = this.repository.createQueryBuilder(`${schema}.${tableName}`);
        if (pageOptionsDto.q !== '' && pageOptionsDto.q !== undefined) {
            queryBuilder.where(`${schema}.${tableName}.unitName LIKE :name`, { name: `%${pageOptionsDto.q}%` })
        }

        if (pageOptionsDto.year !== null && pageOptionsDto.year !== undefined) {
            queryBuilder.andWhere(`${schema}.${tableName}.period = :period`, { period: pageOptionsDto.year })
        }

        if (pageOptionsDto.quartal !== null && pageOptionsDto.quartal !== undefined) {
            queryBuilder.andWhere(`${schema}.${tableName}.quarter = :quarter`, { quarter: pageOptionsDto.quartal })
        }

        queryBuilder
            .andWhere(`status <> :status AND isDeleted = 0`, { status: LproStatusEnum.NEW })
            .orderBy(`${schema}.${tableName}.createdAt`, 'DESC');

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }
}