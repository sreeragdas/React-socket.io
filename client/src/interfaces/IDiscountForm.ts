export interface IDiscountForm {
    serviceName: string;
    variationName: string;
    discountCode: string;
    dealOfferName: string;
    startDate: string;
    endDate: string | null;
    remarks: string | null;
    discountType: string;
    maxDisAmount: number;
    disCountLimit: string;
    minDisAmountLimit: number;
    memberUseLimit: number;
    disCodeUsedto: string;
}
