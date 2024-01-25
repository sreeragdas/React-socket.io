import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { ITrainee, ITraineeDropped, ITraineePagination } from '../interfaces';

export class TraineeStore {
    public traineeData: ITrainee[] | [];
    public totalRecords: number;
    public loading: boolean;
    public TraineeEditData: ITrainee | null;
    public droppedTraineeData: ITraineeDropped[] | [];
    public TraineeWithId: ITrainee | null;
    public constructor() {
        this.traineeData = [];
        this.totalRecords = 0;
        this.loading = false;
        this.TraineeEditData = null;
        this.droppedTraineeData = [];
        this.TraineeWithId = null;
        makeAutoObservable(this);
    }

    private setLoading(state: boolean): void {
        this.loading = state;
    }
    private setTraineeTableData(value: ITrainee[]): void {
        this.traineeData = value;
    }
    private setDroppedTraineeTableData(value: ITraineeDropped[]): void {
        this.droppedTraineeData = value;
    }
    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }
    private setTraineeEditData(value: ITrainee) {
        this.TraineeEditData = value;
    }
    private setTraineeWithId(value: ITrainee) {
        this.TraineeWithId = value;
    }
    public async getTraineeTableData(pagination?: ITraineePagination): Promise<boolean> {
        this.setLoading(true);

        try {
            const response = await axios.get('/api/Trainees', { params: pagination });
            this.setTraineeTableData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
            return true;
        } catch (error) {
            console.error('Getting staff table data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
        return false;
    }

    public async postTraineeData(data: ITrainee) {
        this.setLoading(true);
        try {
            await axios.post('/api/Trainees', {
                ...data,
                createdOn: new Date(),
                createdBy: 'don',
            });

            NotificationManager.success('New Trainee Added');
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async UpdateActiveData(id: number): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.put(`/api/Trainees/api/Trainee/PutStatusTrainee?id=${id}`, { isActive: false });
            NotificationManager.success('successfully Archived...');
            return true;
        } catch (error) {
            console.error('Deleting staff data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
        return false;
    }

    public async getEditedData(id: number, value: ITrainee): Promise<void> {
        this.setLoading(true);

        try {
            await axios.put(`/api/Trainees/api/Trainee/PutTrainee?id=${id}`, {
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
    public async getEditingData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            const response = await axios.get(`/api/Trainees/${id}`);
            this.setTraineeEditData(response.data);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    public async getDroppedTraineeTableData(pagination?: ITraineePagination): Promise<boolean> {
        this.setLoading(true);

        try {
            const response = await axios.get('/api/Trainees/DroppedTrainees', { params: pagination });
            this.setDroppedTraineeTableData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
            return true;
        } catch (error) {
            console.error('Getting staff table data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
        return false;
    }
    public async UpdateDroppedActiveData(id: number): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.put(`/api/Trainees/api/Trainee/PutStatusTrainee?id=${id}`, { isActive: true });
            NotificationManager.success('successfully Archived...');
            return true;
        } catch (error) {
            console.error('Deleting staff data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
        return false;
    }

    public async deleteTraineData(id: number): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.delete(`/api/Trainees/${id}`);
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

    public async getTraineeWithId(id?: number): Promise<boolean> {
        this.setLoading(true);

        try {
            const response = await axios.get(`/api/Trainees/${id}`);
            this.setTraineeWithId(response.data);
            console.log(this.TraineeWithId, 'data from store=========');

            return true;
        } catch (error) {
            console.error('Getting staff table data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
        return false;
    }
}
