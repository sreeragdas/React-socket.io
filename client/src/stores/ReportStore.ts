import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IReport, IReportFilter } from './../interfaces/IReport';

export class ReportStore {
    public reportData: IReport[];
    public totalRecords: number;

    public constructor() {
        this.reportData = [];
        this.totalRecords = 0;
        this.loading = false;
        makeAutoObservable(this);
    }
    private setReportData(value: IReport[]) {
        this.reportData = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }
    public loading: boolean;
    public setLoading(value: boolean) {
        this.loading = value;
    }

    public async getReportData(data: IReportFilter) {
        this.setLoading(true);
        const _fromDate = data.FromDate?.toISOString().split('T')[0];
        const _toDate = data.ToDate?.toISOString().split('T')[0];
        try {
            const response = await axios.get('/api/Reports/GetEnquiryReport', {
                params: { ...data, FromDate: _fromDate, ToDate: _toDate },
            });
            this.setReportData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            this.setLoading(false);
            this.setReportData([]);
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
