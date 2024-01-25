import { object, SchemaOf } from 'yup';

import { IAddMember } from '../src/interfaces';
import { arrayOptional, dateOptional, dateRequired, phoneNumMatch, stringOptional, stringRequired } from './SchemaValidators';

export const MembersDataSchema: SchemaOf<IAddMember> = object({
    fullName: stringRequired('Full Name is required'),
    countryCode: stringRequired('Country is required'),
    emgRelationship: stringRequired('Relationship is required'),
    gender: stringRequired('Selecting the gender field is required'),
    emgContactName: stringRequired('Contact Name is required'),
    emgCountryCode: stringRequired('Country is required'),
    email: stringRequired('Email isrequired').email('Enter a valid email'),
    dob: dateRequired('Date of birth is required'),
    emgContactNumber: phoneNumMatch,
    contactNumber: phoneNumMatch,

    goalRemarks: stringOptional,
    aboutYourSelf: stringOptional,
    location: stringOptional,
    proContactNumber: stringOptional,
    proOfficialEmail: stringOptional,
    proCompanyName: stringOptional,
    proOccupation: stringOptional,
    locality: stringOptional,
    address: stringOptional,
    salesRep: stringOptional,
    leadSource: stringOptional,
    memberManager: stringOptional,
    batch: stringOptional,
    generalTrainer: stringOptional,
    surgery: stringOptional,
    vegetarian: stringOptional,
    age: stringOptional,
    practicedFitnessActivity: stringOptional,
    bloodLevel: stringOptional,
    goalType: stringOptional,

    injuries: arrayOptional,

    endDate: dateOptional,
    anniversary: dateOptional,
    startDate: dateOptional,
});
