export interface IEnquiryTable {
    id: number;
    fullName: string;
    countryCode: string;
    contactNumber: string;
    email: string;
    dob: string;
    locality: string;
    enquiryDate: string;
    serviceName: string;
    leadSource: string;
    enquiryType: string;
    staffName: string;
    dateandTime: string;
    callTag: string;
    message: string;
    isSurgery: boolean;
    stayAddr: string;
    isVeg: boolean;
    ageRange: string;
    goalType: string;
    startDate: string;
    endDate: string;
    goalRemarks: string;
}

export interface IEnquiryPagination {
    PageNumber: number;
    PageSize: number;
}
