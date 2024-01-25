import { object, SchemaOf } from 'yup';

import { IAddNewVariation } from '../src/interfaces';
import { arrayRequired, stringOptional, stringRequired } from './SchemaValidators';

export const VariationDataSchema: SchemaOf<IAddNewVariation> = object({
    variationName: stringRequired('Service Variation Name is Required'),
    validity: stringRequired('validity is Required'),
    upgradable: stringRequired('Upgradable is Required'),
    transferable: stringRequired('Transferable is Required'),
    appointments: stringRequired('Appointments is Required'),
    registrationFee: stringRequired('RegistrationFee is Required'),
    promote: stringRequired('Promote is Required'),

    category: arrayRequired('Category is Required'),

    maxMember: stringOptional,
    serviceFee: stringOptional,
    timeHrs: stringOptional,
    timeMin: stringOptional,
});
