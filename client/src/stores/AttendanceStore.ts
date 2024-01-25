import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IAttendanceReport, IAttendanceReportPagination } from '../interfaces';

export class AttendanceStore {
    public loading: boolean;
    public attendanceTableData: IAttendanceReport[] | [];
    public totalRecords: number;
    public constructor() {
        this.loading = false;
        this.attendanceTableData = [];
        this.totalRecords = 0;
        makeAutoObservable(this);
    }
    private setAttendanceTableData(value: IAttendanceReport[]) {
        this.attendanceTableData = value;
    }
    private setLoading(value: boolean) {
        this.loading = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }
    public async getTableData(pagination: IAttendanceReportPagination) {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Attendance/GetDailyAttendance', { params: pagination });
            this.setAttendanceTableData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
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
