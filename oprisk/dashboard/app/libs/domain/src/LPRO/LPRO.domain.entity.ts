import {
    IAMType,
    KRIType,
    LEDType,
    compositeRCSA,
    riskMapType,
    scoreRCSAType,
    topRiskType,
} from 'apps/api/src/core/domain/entities';
import { Entity } from 'libs/common/src/entity/entity';

export class LPRODomain extends Entity<number> {
    protected compositeScoreRCSA: scoreRCSAType;
    protected riskMap: riskMapType;
    protected topRisk: topRiskType;
    protected compositeRCSA: compositeRCSA;
    protected KRI: KRIType;
    protected LED: LEDType;
    protected IAM: IAMType;

    // Getters;
    public getScoreRCSA(): scoreRCSAType {
        return this.compositeScoreRCSA;
    }

    public getRiskMap(): riskMapType {
        return this.riskMap;
    }

    public getCompositeRCSA(): compositeRCSA {
        return this.compositeRCSA;
    }

    public getTopRisk(): topRiskType {
        return this.topRisk;
    }

    public getKRI(): KRIType {
        return this.KRI;
    }

    public getLED(): LEDType {
        return this.LED;
    }

    public getIAM(): IAMType {
        return this.IAM;
    }
}
