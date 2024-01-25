import { object, SchemaOf } from 'yup';

import { IAddNewService } from '../src/interfaces';
import { stringOptional, stringRequired } from './SchemaValidators';

export const ServiceDataSchema: SchemaOf<IAddNewService> = object({
    serviceName: stringRequired('Service Name is Required'),

    sacCode: stringOptional,
});
