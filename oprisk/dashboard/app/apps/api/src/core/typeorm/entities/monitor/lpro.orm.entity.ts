import { LevelUnitKerja, LproStatusEnum, QuarterQEnum, TableNaming } from "apps/api/src/common";
import { DatabaseToken } from "apps/api/src/components/infra/database/database.token";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractOrmEntity } from "../base/abstract.orm.entity";
import { LproApprovalOrmEntity } from "./lpro-approval.orm.entity";

@Entity({ name: TableNaming('lpro'), schema: DatabaseToken.Schema.description})
export class LproOrmEntity extends AbstractOrmEntity { 

    @Column('varchar', { length: 20, nullable: false})
    lpro: LevelUnitKerja
    
    @Column('int', { nullable: false})
    unitId: number

    @Column('varchar', { length: 100, nullable: false})
    unitName: string

    @Column('smallint', { nullable: false })
    period: number;
    
    @Column('char', { length: 2, nullable: false})
    quarter: QuarterQEnum

    @Column('varchar', { length: 30, nullable: false})
    status: LproStatusEnum;

    @Column('int', { nullable: true})
    rcsaId: number

    @Column('int', { nullable: true})
    kriId: number

    @Column('int', { nullable: true})
    ledId: number

    @Column('int', { nullable: true})
    iamId: number
    
    @Column('text', { nullable: true })
    summary: string;

    @OneToMany(() => LproApprovalOrmEntity, (lpro => lpro.lpro))
    approvalHistory: LproApprovalOrmEntity[]
}
