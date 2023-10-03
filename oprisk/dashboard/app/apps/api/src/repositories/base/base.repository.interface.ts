import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, UpdateResult } from "typeorm";
import { PageOptionsDto } from "../../core/typeorm/dtos/page-options.dto";
import { PageDto } from "../../core/typeorm/dtos/page.dto";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface BaseRepositoryInterface<T> {
    findAllWithPageOptions(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>>;

    create(data: DeepPartial<T>): T;
    
    save(data: DeepPartial<T>): Promise<T>;

    findOneById(id: any): Promise<T>;

    findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;

    findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;

    findAll(options?: FindManyOptions<T>): Promise<T[]>;

    findAllWithPageOptions(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>>

    remove(id: any): Promise<DeleteResult>;

    removeMany(ids: any[]): Promise<DeleteResult>;
    
    removeManyWithCondition(query: FindOptionsWhere<T>);
    
    softDelete(id: any): Promise<DeleteResult>;
    
    softDeleteMany(ids: any[]): Promise<DeleteResult>;
    
    preload(entityLike: DeepPartial<T>): Promise<T>;
    
    update(id: any, partialEntity: QueryDeepPartialEntity<any>): Promise<UpdateResult>;
}