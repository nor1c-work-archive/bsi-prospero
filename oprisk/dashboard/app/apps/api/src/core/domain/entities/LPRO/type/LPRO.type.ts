type value = {
    value: string;
    rating: string;
    backgroundColor: string;
    textColor: string;
};

export type scoreRCSAType = {
    regions: {
        region: string;
        IHRR: value;
        control: value;
        compoosite: value;
        areas: {
            area: string;
            IHRR: value;
            control: value;
            compoosite: value;
            subareas: {
                subarea: string;
                IHRR: value;
                control: value;
                compoosite: value;
                segments: {
                    segment: string;
                    IHRR: value;
                    control: value;
                    compoosite: value;
                }[];
            }[];
        }[];
    }[];
    groups: {
        group: string;
        IHRR: value;
        control: value;
        compoosite: value;
        units: {
            unit: string;
            IHRR: value;
            control: value;
            compoosite: value;
        }[];
    }[];
    group: value;
};

export type riskMapType = {
    regions: any;
};

export type topRiskType = {
    regions: {
        region: string;
        description: string;
        segment: string;
        IHRR: value;
        control: value;
        compoosite: value;
        areas: {
            area: string;
            IHRR: value;
            control: value;
            compoosite: value;
            subareas: {
                subarea: string;
                IHRR: value;
                control: value;
                compoosite: value;
            }[];
        }[];
    }[];
};

export type KRIType = {
    //
}[];

export type LEDType = {
    //
};

export type IAMType = {
    modules: {
        module: string;
        from: number;
        to: number;
    }[];
};

export type compositeRCSA = {
    //
};
type baseType = {
    compositeScoreRCSA: scoreRCSAType;
    riskMap: riskMapType;
    compositeRCSA: compositeRCSA;
    topRisk: topRiskType;
    KRI: KRIType;
    LED: LEDType;
    IAM: IAMType;
};

export type LPROType = baseType;
