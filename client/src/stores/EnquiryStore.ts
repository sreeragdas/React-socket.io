import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IAddEnquiry, IAddEnquiryAdditionalDetails, IAddEnquiryFitnessProfile, IAddEnquiryPersonalDetails, IResponse } from '../interfaces';
import { IEnquiryPagination, IEnquiryTable } from './../interfaces/IEnquiryTable';
import { IObjectResponse } from './../interfaces/IObjectResponse';

export class EnquiryStore {
    public loading: boolean;
    public personalData: IAddEnquiryPersonalDetails | null;
    public additionalData: IAddEnquiryAdditionalDetails | null;
    public fitnessData: IAddEnquiryFitnessProfile | null;
    public EnquiryData: IAddEnquiry | null;
    public enquiyTable: IEnquiryTable[] | [];
    public totalRecords: number;

    public constructor() {
        this.loading = false;
        this.personalData = null;
        this.additionalData = null;
        this.fitnessData = null;
        this.EnquiryData = null;
        this.enquiyTable = [];
        this.totalRecords = 0;
        makeAutoObservable(this);
    }

    private setloading(state: boolean): void {
        this.loading = state;
    }
    private setEnquiryTable(value: IEnquiryTable[]) {
        this.enquiyTable = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }
    public setpersonalData(value: IAddEnquiryPersonalDetails): void {
        this.personalData = value;
    }

    public setadditionalData(value: IAddEnquiryAdditionalDetails): void {
        this.additionalData = value;
    }
    public setfitnessData(value: IAddEnquiryFitnessProfile): Promise<boolean> {
        this.fitnessData = value;
        this.EnquiryData = {
            ...(this.personalData as IAddEnquiryPersonalDetails),
            ...(this.additionalData as IAddEnquiryAdditionalDetails),
            ...(this.fitnessData as IAddEnquiryFitnessProfile),
        };
        return this.addEnquiryData(this.EnquiryData);
    }

    public async getEnquiryTAbleData(pagination: IEnquiryPagination) {
        this.setloading(true);
        const { PageNumber, PageSize } = pagination;
        try {
            const response = await axios.get<IObjectResponse<IEnquiryTable[]>>('/api/Enquiry', { params: { PageNumber, PageSize } });
            this.setEnquiryTable(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setloading(false);
        }
    }

    public async addEnquiryData(data: IAddEnquiry): Promise<boolean> {
        this.setloading(true);

        try {
            await axios.post<IResponse>('/api/Enquiry', data);
            NotificationManager.success('Successfully added...', '', 3000);
            return true;
        } catch (error) {
            console.error('Adding enquiry data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setloading(false);
        }
        return false;
    }
}
