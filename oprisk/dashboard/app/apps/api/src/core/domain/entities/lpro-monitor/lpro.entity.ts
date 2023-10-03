import { LproDomain } from "@app/domain";
import { LproType } from "./type/lpro.type";

export class LproEntity extends LproDomain {
    constructor(payload: LproType){
        super()
        this.id = payload.id;
        this.lpro = payload.lpro;
        this.unitId = payload.unitId;
        this.unitName = payload.unitName;
        this.period = payload.period;
        this.quarter = payload.quarter;
        this.status = payload.status;
        this.summary = payload.summary;
        this.rcsaId = payload.rcsaId;
        this.kriId = payload.kriId;
        this.iamId = payload.iamId;
        this.ledId = payload.ledId;

        this.createdAt= payload.createdAt;
        this.createdBy= payload.createdBy;
        this.createdByName= payload.createdByName;
        this.updatedAt= payload.updatedAt;
        this.updatedBy= payload.updatedBy;
        this.updatedByName= payload.updatedByName;
        this.deletedAt= payload.deletedAt;
        this.deletedBy= payload.deletedBy;
        this.deletedByName= payload.deletedByName;
        this.isDeleted= payload.isDeleted;
    }

    public static async new(payload: LproType): Promise<LproEntity> {
        const template = new LproEntity(payload);
        await template.validate;
        return template;
    }
}