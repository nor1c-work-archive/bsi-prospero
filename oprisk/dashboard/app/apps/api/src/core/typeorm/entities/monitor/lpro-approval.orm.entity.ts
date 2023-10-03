import { LevelUnitKerja, LproStatusEnum, QuarterQEnum, TableNaming } from "apps/api/src/common";
import { DatabaseToken } from "apps/api/src/components/infra/database/database.token";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractOrmEntity } from "../base/abstract.orm.entity";
import { LproOrmEntity } from "./lpro.orm.entity";
import { Exclude } from "class-transformer";

@Entity({ name: TableNaming('lproApproval'), schema: DatabaseToken.Schema.description})
export class LproApprovalOrmEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => LproOrmEntity, (lpro: LproOrmEntity) => lpro.approvalHistory, { onDelete: 'CASCADE' })
    lpro: LproOrmEntity

    @Column('varchar', { length: 30, nullable: false })
    status: string

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Column('varchar', { length: 100, nullable: true })
    createdBy: string;

    @Column('varchar', { length: 100, nullable: true })
    createdByName: string;
}