export interface ISms {
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

export interface ISmsOptions {
    allMembers: string;
    PageNumber: number;
    PageSize: number;
}
