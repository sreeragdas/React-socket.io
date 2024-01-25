export interface ITrainee {
    id: number;
    firstName: string;
    lastName: string;
    dob: Date;
    membership: string;
    nextPaymentDate: Date;
    classes: string;
    email: string;
    countryCode: string;
    contactNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    photo?: string;
    createdOn: Date;
    createdBy: string;
    isActive: boolean;
    name: string;
}

export interface ITraineePagination {
    PageNumber: number;
    PageSize: number;
}

export interface ITraineeDetails {
    id?: number;
    trainerName: string;
    designation: string;
}

export interface ITraineeDropped {
    id?: number;
    photo: string;
    name: string;
    membership: string;
    personalTrainer: string;
    contactNumber: string;
    email: string;
    city: string;
    active: boolean;
}
