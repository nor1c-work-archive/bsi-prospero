import { PipeTransform } from '@nestjs/common';
import { deepParseJson } from 'deep-parse-json';
import * as _ from 'lodash';

type TParseFormDataJsonOptions = {
    except?: string[];
};

// noinspection JSUnusedGlobalSymbols
export class ParseFormDataJsonPipe implements PipeTransform {
    constructor(private options?: TParseFormDataJsonOptions) {}

    transform(value: any) {
        const { except } = this.options;
        const serializedValue = value;
        const originProperties = {};
        if (except?.length) {
            _.merge(originProperties, _.pick(serializedValue, ...except));
        }
        const deserializedValue = deepParseJson(value);
        // console.log(`deserializedValue`, deserializedValue);
        return { ...deserializedValue, ...originProperties };
    }
}
