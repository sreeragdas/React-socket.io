export interface IEmail {
    id: string;
    name: string;
    address: string;
    state: string;
    phNo: string;
    dob: string;
    bloodGroup: string;
    remarks: string;
    emergencyContactPerson: string;
    emergencyPhoneNumber: string;
    emergencyPersonRelationship: string;
}

export interface IEmailFilter {
    PageSize: number;
    PageNumber: number;
    FromDate: Date | null;
    ToDate: Date | null;
}
