import { LPRODomain } from '@app/domain';
import { LPROType } from './type/LPRO.type';

export class LPROEntity extends LPRODomain {
    constructor(payload: LPROType) {
        super();
        this.compositeScoreRCSA = payload.compositeScoreRCSA;
        this.riskMap = payload.riskMap;
        this.compositeRCSA = payload.compositeRCSA;
        this.topRisk = payload.topRisk;
        this.KRI = payload.KRI;
        this.LED = payload.LED;
        this.IAM = payload.IAM;
    }

    public static async new(payload: LPROType): Promise<LPROEntity> {
        const entity = new LPROEntity(payload);
        await entity.validate();
        return entity;
    }
}
