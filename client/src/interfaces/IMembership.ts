export interface IMembership {
    id: number;
    title: string;
    package: string;
    numofMonths: number;
    price: number;
    scheduleDate: Date;
    startDate: Date;
    endDate: Date;
    description: string;
    createdby: string;
    createdOn: Date;
    isActive: false;
}

export interface IMembershipPagination {
    PageSize: number;
    PageNumber: number;
}

export interface IMembershipPost {
    title: string;
    package: string;
    numofMonths: number;
    price: number;
    scheduleDate: Date;
    startDate: Date;
    endDate: Date;
    description: string;
    createdby: string;
    createdOn: Date;
    isActive: boolean;
}
