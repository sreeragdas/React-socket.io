export interface IAddOffers {
    dealName: string | undefined;
    discountPer?: number;
    endDate: string | undefined;
    netFee?: number | unknown;
    serviceFee?: number | unknown;
    serviceName: string | undefined;
    variation: string | undefined;
    startDate: string | undefined;
    appOnlyOffer?: boolean;
}
