export interface IDesignation {
    id: number;
    designationName: string;
    remarks: string;
    createdBy: string;
    isActive: boolean;
}

export interface IDesignationPagination {
    PageNumber: number;
    PageSize: number;
}
