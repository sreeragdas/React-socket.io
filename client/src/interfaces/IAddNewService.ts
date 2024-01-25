export interface IAddNewService {
    serviceActivityName: string;
    sacCode: string;
    isActive?: boolean;
    remarks?: null;
    createdOn?: Date | null;
    createdBy?: string | null;
    updatedOn?: Date | null;
    updatedBy?: string | null;
}
