export interface IOffers {
    id?: number;
    sNo: string;
    date: string;
    serviceName: string;
    dealName: string;
    startDate: string;
    endDate: string;
    variation: string;
    serviceFee: number;
    discountRate: string;
    discountPer: number;
    netFee: number;
    edit: string;
    status: string;
    delete: string;
}

export interface IOfferPagination {
    options: string;
    PageNumber: number;
    PageSize: number;
}
