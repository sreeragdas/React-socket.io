import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IEmail, IEmailFilter } from './../interfaces/IEmail';

export class EmailStore {
    public email!: IEmail[];
    public loading: boolean;
    public totalRecord: number;

    public constructor() {
        this.email = [];
        this.loading = false;
        this.totalRecord = 0;
        makeAutoObservable(this);
    }

    private setEmail(value: IEmail[]) {
        this.email = value;
    }
    private setLoading(value: boolean) {
        this.loading = value;
    }
    private setTotalRecord(value: number) {
        this.totalRecord = value;
    }

    public async getEmailData(dateFilter: IEmailFilter): Promise<void> {
        this.setLoading(true);
        const _fromDate = dateFilter.FromDate ? dateFilter.FromDate.toISOString().split('T')[0] : dateFilter.FromDate;
        const _toDate = dateFilter.ToDate ? dateFilter.ToDate.toISOString().split('T')[0] : dateFilter.ToDate;
        try {
            const response = await axios.get('api/Marketing/GetMembersBirthday', {
                params: { ...dateFilter, FromDate: _fromDate, ToDate: _toDate },
            });
            this.setEmail(response.data.data);
            this.setTotalRecord(response.data.totalRecords);
        } catch (error) {
            this.setEmail([]);
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

    // public async postSms(data: string): Promise<void> {
    //     this.setLoading(true);
    //     try {
    //         await axios.post('emailPath', data);
    //         NotificationManager.success('Successfully Sended...');
    //     } catch (error) {
    //         NotificationManager.error(
    //             (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
    //         );
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }
}
