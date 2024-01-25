export interface IDiscount {
    discountCodeName: string;
    serviceName: string;
    event: string;
    deal: string;
    startDate: string;
    endDate: string;
    option: string;
}
export interface IDiscountFilter {
    service: string;
    all: string;
}
