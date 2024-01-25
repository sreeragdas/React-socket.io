import { array, date, string } from 'yup';

export const stringRequired = (txt: string) => string().required(txt);
export const dateRequired = (txt: string) => date().required(txt);
export const arrayRequired = (txt: string) => array().required(txt);

export const stringOptional = string().default('');
export const arrayOptional = array().optional();
export const dateOptional = date().default(null);

export const phoneNumMatch = stringRequired('Contact Number is required')
    .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
    )
    .min(10, 'to short')
    .max(10, 'to long');
