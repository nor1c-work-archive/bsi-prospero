import { LproEntity } from "apps/api/src/core/domain/entities";
import { LproOrmEntity } from "../lpro.orm.entity";

export class LproMapper {
    public static toOrmEntity(domain: LproEntity): LproOrmEntity {
        if (!domain) return null

        const lpro: LproOrmEntity = new LproOrmEntity()
        lpro.lpro = domain.getLpro()
        lpro.unitId = domain.getUnitId()
        lpro.unitName = domain.getUnitName()
        lpro.quarter = domain.getQuarter()
        lpro.period = domain.getPeriod()
        lpro.status = domain.getStatus()
        lpro.summary = domain.getSummary()
        lpro.rcsaId = domain.getRcsaId()
        lpro.kriId = domain.getKriId()
        lpro.ledId = domain.getLedId()
        lpro.iamId = domain.getIamId()

        lpro.createdAt = domain.getCreatedAt();
        lpro.createdBy = domain.getCreatedBy();
        lpro.createdByName = domain.getCreatedByName();
        lpro.updatedAt = domain.getUpdatedAt();
        lpro.updatedBy = domain.getUpdatedBy();
        lpro.updatedByName = domain.getUpdatedByName();
        lpro.deletedAt = domain.getDeletedAt();
        lpro.deletedBy = domain.getDeletedBy();
        lpro.deletedByName = domain.getDeletedByName();
        lpro.isDeleted = domain.getIsDeleted();

        return lpro
    }

    public static toDomain(orm: LproOrmEntity) {
        return new LproEntity({
            id: Number(orm.id),
            lpro: orm.lpro,
            unitId: orm.unitId,
            unitName: orm.unitName,
            period: orm.period,
            quarter: orm.quarter,
            status: orm.status,
            summary: orm.summary,
            rcsaId: orm.rcsaId,
            kriId: orm.kriId,
            ledId: orm.ledId,
            iamId: orm.iamId,
            createdAt: orm.createdAt,
        })
    }

    public static toDomainEntities(orm: LproOrmEntity[]) {
        return orm.map( orm => this.toDomain(orm))
    }
}