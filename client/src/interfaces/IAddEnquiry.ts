export type IAddEnquiry = IAddEnquiryPersonalDetails & IAddEnquiryAdditionalDetails & IAddEnquiryFitnessProfile;
export interface IAddEnquiryPersonalDetails {
    fullName: string;
    countryCode: string;
    contactNumber: string;
    email: string;
    dob: string;
    locality: string;
    enquiryDate: Date | null | string;
    serviceName: string;
    leadSource: string;
    enquiryType: string;
    staffname: string;
    dateandTime: Date | null | string;
    callTag: string;
    message: string;
}

export interface IAddEnquiryAdditionalDetails {
    isSurgery?: boolean;
    stayAddr: string;
    isVeg?: boolean;
    ageRange: string;
}

export interface IAddEnquiryFitnessProfile {
    goaltype: string;
    startDate: Date | null | string;
    endDate: Date | null | string;
    goalRemarks: string;
}
