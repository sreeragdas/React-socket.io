import { IFieldOption } from './IFieldOption';

export interface IFieldGroup<T> {
    header?: string;
    fields: IFieldOption<T>[];
    subgroups?: IFieldGroup<T>[];
}
