import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IDesignationPagination } from '../interfaces';
import { IDesignation } from './../interfaces/IDesignation';

export class DesignationStore {
    public loading: boolean;
    public designationTableData: IDesignation[] | [];
    public totalRecord: number;
    public editData: IDesignation | null;
    public constructor() {
        this.loading = false;
        this.designationTableData = [];
        this.totalRecord = 0;
        this.editData = null;
        makeAutoObservable(this);
    }

    private setLoading(value: boolean) {
        this.loading = value;
    }

    private setTotalRecord(value: number) {
        this.totalRecord = value;
    }

    private setDesignationTableData(value: IDesignation[] | []) {
        this.designationTableData = value;
    }
    private setEditingData(value: IDesignation) {
        this.editData = value;
    }

    public async getDesignationTableData(pagination: IDesignationPagination) {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Designation', { params: pagination });
            this.setDesignationTableData(response.data.data);
            this.setTotalRecord(response.data.totalRecords);
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

    public async updateSwitch(state: boolean, id: number) {
        this.setLoading(true);

        try {
            await axios.put(`api/Designation/api/Designation/PutStatusDesignation?id=${id}`, { isActive: state });
            state ? NotificationManager.success('Activated') : NotificationManager.success('Deactived');
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

    public async addDesignation(value: IDesignation) {
        this.setLoading(true);

        try {
            await axios.post('/api/Designation', { ...value });
            NotificationManager.success('Designation Added', '', 3000);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    public async deleteDesignation(id: number) {
        this.setLoading(true);
        try {
            await axios.delete(`/api/Designation/${id}`);
            NotificationManager.success('Designation Deleted', '', 3000);
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

    public async getEditingData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            const response = await axios.get(`/api/Designation/${id}`);
            this.setEditingData(response.data);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    public async getEditedData(id: number, value: IDesignation): Promise<void> {
        this.setLoading(true);

        try {
            await axios.put(`/api/Designation/api/Designation/PutDesignation?id=${id}`, {
                ...value,
                createdOn: new Date(),
            });
            NotificationManager.success('Successfully edited...');
        } catch (error) {
            console.error('editing offer data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }
}
