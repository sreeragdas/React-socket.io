import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IAddStaff, IAddStaffForm, IEditStaffForm, IResponse, IStaff, IStaffPagination, ITraineeDetails, ITrainers } from '../interfaces';
import { IObjectResponse } from './../interfaces/IObjectResponse';

export class StaffStore {
    public loading: boolean;
    public staffTableData: IStaff[] | [];
    public staffData: IAddStaff | [];
    public totalRecords: number;
    public staffEditData: IEditStaffForm | null;
    public trainers: ITrainers[] | [];

    public traineeTable: ITraineeDetails[] | [];
    public constructor() {
        this.loading = false;
        this.staffTableData = [];
        this.staffData = [];
        this.totalRecords = 0;
        this.staffEditData = null;
        this.trainers = [];
        this.traineeTable = [];
        makeAutoObservable(this);
    }

    private setLoading(state: boolean): void {
        this.loading = state;
    }

    private setStaffTableData(value: IStaff[]): void {
        this.staffTableData = value;
    }

    private setStaffData(value: IAddStaff | []): void {
        this.staffData = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }

    private setStaffEditData(value: IEditStaffForm) {
        this.staffEditData = value;
    }
    private setTrainers(value: ITrainers[]) {
        this.trainers = value;
    }
    private setTraineetData(value: ITraineeDetails[]) {
        this.traineeTable = value;
    }

    public async getStaffTableData(pagination?: IStaffPagination): Promise<boolean> {
        this.setLoading(true);

        try {
            const response = await axios.get<IObjectResponse<IStaff[]>>('/api/Users', { params: pagination });
            this.setStaffTableData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
            return true;
        } catch (error) {
            console.error('Getting staff table data failed!...', { error });
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

    // ADD STAFF

    public async getEditStaffData(id: number) {
        this.setLoading(true);
        try {
            const response = await axios.get(`/api/Users/${id}`);
            this.setStaffEditData(response.data[0]);
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

    public async addStaffData(data: IAddStaffForm): Promise<boolean> {
        try {
            const { role } = data;
            await axios.post<IResponse>('/api/Users', {
                userName: data.fullName,
                password: data.password,
                email: data.email,
                role: role,
                permissions: 1,
                userDdataDetails: [{ ...data, isActive: true, resume: '' }],
            });
            NotificationManager.success('Successfully added...', '', 3000);
            return true;
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

    public async updateStaffData(id: number, data: IAddStaffForm): Promise<boolean> {
        this.setLoading(true);
        const { role } = data;
        try {
            const value = {
                userName: this.staffEditData?.userName,
                password: this.staffEditData?.password,
                email: this.staffEditData?.email,
                role: role,
                permissions: this.staffEditData?.permissions,
                userItemDetails: [{ ...data, resume: '' }],
            };
            await axios.put<IResponse>(`/api/Users/api/Users/PutUser?id=${id}`, value);
            NotificationManager.success('Successfully updated...', '', 3000);
            return true;
        } catch (error: unknown) {
            console.error('Updating staff data failed!...', error);
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

    public async deleteStaffData(id: number): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.delete(`/api/Users/${id}`);
            NotificationManager.success('successfully deleted...', '', 3000);
            return true;
        } catch (error) {
            console.error('Deleting staff data failed!...', { error });
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

    public async updateStaffActive(state: boolean, id: number): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.put(`api/Users/api/Users/PutStatusUsers?id=${id}`, { isActive: state });
            if (state) {
                NotificationManager.success('Activated', '', 3000);
            } else {
                NotificationManager.success('Deactivated', '', 3000);
            }
            return true;
        } catch (error) {
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
    // trainer

    public async getTrainer() {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Users/GetTrainer');
            this.setTrainers(response.data);
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

    public async getTraineeData() {
        this.setLoading(true);
        try {
            const response = await axios.get(`api/Users/GetTrainer`);
            this.setTraineetData(response.data);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }
}
