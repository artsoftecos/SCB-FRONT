import { ConvocatoryType } from './convocatory-type';
import { Oferrer } from './oferrer';

export class Convocatory {
    id: number;
    name: string;
    convocatoryType: ConvocatoryType;
    numberBeneficiaries: number;
    description: string;
    offerer: Oferrer;
    resultDate: string;
}
