import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

import { BaseRepositoryInterface } from './base.repository.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../core';

interface HasId {
  id: number | string;
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseRepositoryInterface<T>
{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async saveTransaction(queryRunner: QueryRunner, data: DeepPartial<T>) {
    return await queryRunner.manager.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return await this.entity.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  // public async remove(data: T): Promise<T> {
  //   return await this.entity.remove(data);
  // }

  public async remove(id: any): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async removeMany(ids: any[]): Promise<DeleteResult>{
    return await this.entity.delete(ids);
  }

  public async removeManyWithCondition(query: FindOptionsWhere<T>) {
    return await this.entity.delete(query);
  }

  public async softDelete(id: any): Promise<DeleteResult> {
    return await this.entity.softDelete(id);
  }

  public async softDeleteMany(ids: any[]): Promise<DeleteResult>{
    return await this.entity.softDelete(ids);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }

  public async update(id: any, partialEntity: QueryDeepPartialEntity<any>): Promise<UpdateResult> {
    return await this.entity.update(id, partialEntity);
  }

  public async findAllWithPageOptions(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>> {
    const tableName = this.entity.metadata.tableName;

    const queryBuilder = this.entity.createQueryBuilder(tableName);
    if (pageOptionsDto.q !== '' && pageOptionsDto.q !== undefined) {
      queryBuilder.where(`${tableName}.name LIKE :name`, { name: `%${pageOptionsDto.q}%` })
    }

    queryBuilder
      .orderBy(`${tableName}.createdAt`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto)
  }
}