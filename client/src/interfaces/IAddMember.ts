export interface IAddMember {
    active?: number;
    imageProfile?: string | null;
    fullName: string;
    goalRemarks: string;
    aboutYourSelf: string;
    location: string;
    proContactNumber: string;
    proOfficialEmail: string;
    proCompanyName: string;
    proOccupation: string;
    emgRelationship: string;
    emgContactNumber: string;
    emgContactName: string;
    locality: string;
    address: string;
    email: string;
    contactNumber: string;
    countryCode: string;
    leadSource: number;
    salesRep: number;
    memberManager: number;
    batch: number;
    generalTrainer: number;
    gender: string;
    emgCountryCode: string;
    surgery: string;
    vegetarian: string;
    age: string;
    practicedFitnessActivity: string;
    bloodLevel: string;
    goalType: string;

    injuries: string[];

    endDate: string;
    anniversary: string;
    dob: string;
    startDate: string;
}
