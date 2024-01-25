import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IAddTraineeToClass, IClasses, IClassPagination } from '../interfaces/IClasses';

export class ClassesStore {
    public loading: boolean;
    public classesTableData: IClasses[];
    public totalRecords: number;
    public singleClassData: IClasses | null;
    public constructor() {
        this.loading = false;
        this.classesTableData = [];
        this.totalRecords = 0;
        this.singleClassData = null;
        makeAutoObservable(this);
    }

    private setLoading(value: boolean) {
        this.loading = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }

    private setClassesTableData(value: IClasses[]) {
        this.classesTableData = value;
    }
    private setSingleClassData(value: IClasses) {
        this.singleClassData = value;
    }

    public async getTableData(pagination?: IClassPagination) {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Classes', { params: pagination });
            this.setClassesTableData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                2000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async getsingleClassData(id?: number) {
        this.setLoading(true);
        try {
            const response = await axios.get(`/api/Classes/${id}`);
            this.setSingleClassData(response.data);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                2000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async postClasses(value: IClasses) {
        this.setLoading(true);
        try {
            await axios.post('/api/Classes', value);
            NotificationManager.success('successfully added classes', '', 2000);
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                2000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async putTraineeToClass(value: IAddTraineeToClass) {
        this.setLoading(true);
        try {
            await axios.put('/api/Classes/api/Class/AddTraineetoClass', value);
            NotificationManager.success('successfully added Trainees', '', 2000);
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                2000
            );
        } finally {
            this.setLoading(false);
        }
    }
}
