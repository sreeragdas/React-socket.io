export interface IOrderItemDetails {
    item: string;
    quantity: number | null;
    rate: number;
    tax: number;
    taxType: string;
    taxAmount: number;
    discountPer: number;
    discount: number;
    startDate: Date | null;
    endDate: Date | null;
    sacCode: string;
    trainerName: string;
    trainerPhone: string;
    remark: string;
}
export interface IBillingDetails {
    paymentMethod: string;
    discountAmount: number;
    status: string;
    totalAmount: number;
    membershipId: number;
    taxPercentage: number;
    netAmount: number;
    taxAmount: number;
    invoiceDate: Date | null;
    fromAddress: string;
    toAddress: string;

    orderItemDetails: IOrderItemDetails[];
}

export interface IBillingTable {
    id: number;
    invoiceNo: number;
    paymentMethod: string;
    status: string;
    totalAmount: number;
    taxPercentage: number;
    netAmount: number;
    taxAmount: number;
    discountAmount: number;
    invoiceDate: string;
    membershipId: number;
    fromAddress: string;
    toAddress: string;
}

export interface IBillingPagination {
    PageNumber: number;
    PageSize: number;
}
