export interface ISetup {
    sNo: string;
    serviceName: string;
    serviceVariation: string;
    sort: string;
    promote: string;
    status: string;
    addVariation: string;
    edit: string;
    delete: string;
}

export interface IUpdateSetupData {
    name: string;
    data: ISetup;
    value: boolean;
}
