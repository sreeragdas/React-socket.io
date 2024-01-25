export interface IReport {
    name: string;
    status: string;
    enquiryDate: string;
    leadSource: string;
    enquiryType: string;
    trialDate: string;
    trialTrainer: string;
    purchaseDate: string;
    serviceName: string;
    membershipStartDate: string;
    membershipExpiryDate: string;
    visitStatus: string;
    message: string;
}
export interface IReportFilter {
    FromDate: Date | null;
    ToDate: Date | null;
    PageNumber: number;
    PageSize: number;
}
