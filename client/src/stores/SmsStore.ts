import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { ISms, ISmsOptions } from './../interfaces/ISms';

interface IData {
    message: string;
    check: boolean;
}

export class SmsStore {
    public smsData: ISms[];
    public loading: boolean;
    public totalRecords: number;
    public constructor() {
        this.smsData = [];
        this.loading = false;
        this.totalRecords = 0;

        makeAutoObservable(this);
    }
    private setSmsData(value: ISms[]) {
        this.smsData = value;
    }
    public setLoading(value: boolean) {
        this.loading = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }
    public async getSmsData(dataFilter: ISmsOptions) {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Marketing/GetMembersSMS', { params: { ...dataFilter } });
            this.setSmsData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            this.setSmsData([]);
            this.setLoading(false);
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async postSmsMessage(data: IData) {
        this.setLoading(true);
        try {
            await axios.post('path', data);
            NotificationManager.success('Successfully posted...', '', 3000);
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
}
