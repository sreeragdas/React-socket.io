import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IBillingDetails, IBillingPagination } from '../interfaces';
import { IBillingTable } from './../interfaces';
import { IObjectResponse } from './../interfaces/IObjectResponse';

export class BillingDetailsStore {
    public billing: IBillingDetails | null;
    public loading: boolean;
    public billingTable: IBillingTable[] | [];
    public totalRecords: number;

    public constructor() {
        this.billing = null;
        this.loading = false;
        this.billingTable = [];
        this.totalRecords = 0;
        makeAutoObservable(this);
    }

    public setBilling(value: IBillingDetails | null): void {
        this.billing = value;
    }
    public setLoading(state: boolean): void {
        this.loading = state;
    }

    private setBillingTable(value: IBillingTable[] | []) {
        this.billingTable = value;
    }
    private setToatalRecords(value: number) {
        this.totalRecords = value;
    }
    public async getBillingDetails(pagination: IBillingPagination) {
        this.setLoading(true);
        const { PageNumber, PageSize } = pagination;
        try {
            const response = await axios.get<IObjectResponse<IBillingTable[]>>('api/Invoices', { params: { PageNumber, PageSize } });
            this.setBillingTable(response.data.data);
            this.setToatalRecords(response.data.totalRecords);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async addBillingDetails(data: IBillingDetails): Promise<boolean> {
        this.setLoading(true);
        try {
            await axios.post('/api/Invoices', data);
            NotificationManager.success('Successfully added...', '', 3000);
            return true;
        } catch (error) {
            console.error('Error!', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
        return false;
    }
}
