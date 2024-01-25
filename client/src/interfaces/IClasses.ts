export interface IClasses {
    id: number;
    className: string;
    desc: string;
    trainer: string;
    trainees: string;
    createdby: string;
    createdOn: Date;
    isActive: boolean;
}

export interface IClassPagination {
    PageNumber: number;
    PageSize: number;
}
export interface IAddTraineeToClass {
    id: number;
    trainees: string;
}
