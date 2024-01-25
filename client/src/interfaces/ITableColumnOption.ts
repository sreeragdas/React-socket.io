export type ITableColumnOption<T> = (
    | IDataOption
    | IImage
    | IDate
    | ISerialNumber
    | (Iboolean & IBooleanOption)
    | ((ICheckBoxOption | ISwitchesOption) & IBaseButtonAction)
    | (
          | ((IEditButtonOption | (IDeleteButtonOption & IDeleteOption) | IAddVariationButton) & IBaseAction)
          | (Ilink & IBaseAction & IBaseViewOption<T>)
          | (IButtonConfirmation & IBaseAction)
          | (IButton & IBaseAction & IButtonLabelName)
      )
    | (IButton & IBaseAction & IButtonLabelName)
) &
    IBaseOption;

interface IBaseOption {
    columnHeading: string;
    labelName: string;
}
interface IDeleteOption {
    title: string;
}

interface IBaseViewOption<T> {
    viewData: T | null;
}

interface IBooleanOption {
    trueLabel: string;
    falseLabel: string;
}

interface IBaseAction {
    onAction: (Index: number) => Promise<boolean>;
}

interface IBaseButtonAction {
    onAction: (state: boolean, Index: number) => Promise<boolean>;
}
interface IButtonLabelName {
    buttonLabelName: string;
}
interface IDataOption {
    type: 'data';
}

interface ICheckBoxOption {
    type: 'checkBox';
}

interface ISwitchesOption {
    type: 'switches';
}
interface IAddVariationButton {
    type: 'addVariationButton';
}

interface IEditButtonOption {
    type: 'editButton';
}

interface IDeleteButtonOption {
    type: 'deleteButton';
}

interface ISerialNumber {
    type: 'serialNumber';
}

interface Iboolean {
    type: 'boolean';
}

interface IDate {
    type: 'date';
}

interface Ilink {
    type: 'link';
}
interface IDate {
    type: 'date';
}
interface IButtonConfirmation {
    type: 'confirmationBox';
}
interface IButton {
    type: 'button';
}
interface IButtonLabelName {
    buttonLabelName: string;
}
interface IImage {
    type: 'photo';
}
