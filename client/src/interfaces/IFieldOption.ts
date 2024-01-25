interface IBaseFieldOption<T> {
    name: keyof T extends string ? keyof T : never;
    label: string;
    required?: boolean;
}

interface IBaseOption<T> {
    options: T | { label: string; value: string | number }[];
}

export interface IInputFieldOption<T> extends IBaseFieldOption<T> {
    type: 'input';
    placeholder?: string;
    multiLine?: boolean;
}

export interface ISelectFieldOption<T> extends IBaseFieldOption<T>, IBaseOption<string[]> {
    type: 'select';
}

export interface IMultiSelectFieldOption<T, K extends keyof T = keyof T, V extends T[K] = T[K]> extends IBaseFieldOption<T> {
    type: 'multi-select';
    placeholder?: string;
    options: V[];
}

export interface IRadioFieldOption<T> extends IBaseFieldOption<T>, IBaseOption<(string | number | boolean)[]> {
    type: 'radio';
    isBoolean?: boolean;
}

export interface IDateFieldOption<T> extends IBaseFieldOption<T> {
    type: 'date';
}

export type IFieldOption<T> =
    | IInputFieldOption<T>
    | ISelectFieldOption<T>
    | IRadioFieldOption<T>
    | IDateFieldOption<T>
    | IMultiSelectFieldOption<T>;
