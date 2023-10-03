import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class AbstractOrmEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Column('varchar', { length: 100, nullable: true })
    createdBy: string;

    @Column('varchar', { length: 100, nullable: true })
    createdByName: string;

    @Column('datetime', { nullable: true })
    updatedAt: Date;

    @Column('varchar', { length: 100, nullable: true })
    updatedBy: string;

    @Column('varchar', { length: 100, nullable: true })
    updatedByName: string;

    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    @Column('tinyint', { nullable: true, default: 0 })
    isDeleted: number;

    @Column('varchar', { length: 100, nullable: true })
    deletedBy: string;

    @Column('varchar', { length: 100, nullable: true })
    deletedByName: string;
}
