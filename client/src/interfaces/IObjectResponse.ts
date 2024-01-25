import { IResponse } from './IResponse';

export interface IObjectResponse<T> extends IResponse {
    data: T;
    totalRecords: number;
}
