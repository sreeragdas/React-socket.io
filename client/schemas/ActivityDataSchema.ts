import { object, SchemaOf } from 'yup';

import { IAddActivity } from '../src/interfaces';
import { stringRequired } from './SchemaValidators';

export const ActivityDataSchema: SchemaOf<IAddActivity> = object({
    activityName: stringRequired('Activity Name is Required'),
});
