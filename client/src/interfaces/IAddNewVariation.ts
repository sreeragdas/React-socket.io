export interface IAddNewVariation {
    variationName: string;
    serviceFee: number;
    validity: number;
    memcount: number;

    timeHours: number;
    timeMins: number;
    upgrade: boolean | string;
    transferable: boolean | string;
    appointments: boolean | string;
    regFee: boolean | string;
    promotionPlgin: boolean | string;
    category: string[] | string;
}
