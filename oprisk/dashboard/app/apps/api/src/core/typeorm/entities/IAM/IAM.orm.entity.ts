import { TableNaming } from 'apps/api/src/common'
import { DatabaseToken } from 'apps/api/src/components/infra/database/database.token'
import { Column, Entity } from 'typeorm'

import { AbstractOrmEntity } from '../base/abstract.orm.entity'

@Entity({
    name: TableNaming('iam_issue'),
    schema: DatabaseToken.Schema.description,
})
export class IAMOrmEntity extends AbstractOrmEntity {
    @Column('bigint', { nullable: false })
    id: number;

    @Column('text', { nullable: true })
    source: string;

    @Column('text', { nullable: true })
    externalSourceId: number;

    @Column('text', { nullable: true })
    description: string;

    @Column('text', { nullable: true })
    groupId: number;

    @Column('text', { nullable: true })
    totalProgressActionPlan: number;

    @Column('text', { nullable: true })
    totalDoneActionPlan: number;

    @Column('text', { nullable: true })
    pic: string;

    @Column('datetime', { nullable: false })
    createdAt: Date;

    @Column('text', { nullable: true })
    createdBy: string;

    @Column('text', { nullable: true })
    createdByName: string;

    @Column('text', { nullable: true })
    createdByEmail: string;

    @Column('datetime', { nullable: true })
    updatedAt: Date;

    @Column('text', { nullable: true })
    updatedBy: string;

    @Column('text', { nullable: true })
    updatedByName: string;

    @Column('text', { nullable: true })
    updatedByEmail: string;

    @Column('datetime', { nullable: true })
    deletedAt: Date;

    @Column('text', { nullable: true })
    deletedBy: string;

    @Column('text', { nullable: true })
    deletedByName: string;

    @Column('text', { nullable: true })
    deletedByEmail: string;

    @Column('text', { nullable: false })
    isDeleted: number;
}
