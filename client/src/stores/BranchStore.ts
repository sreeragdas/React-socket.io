import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IBranch, IObjectResponse, IPageFilter } from '../interfaces';

export class BranchStore {
    public loading: boolean;

    public branchTableData: IBranch[] | [];
    public totalRecords: number;
    public editData: IBranch | null;

    public constructor() {
        this.loading = false;
        this.editData = null;
        this.branchTableData = [];
        this.totalRecords = 0;
        makeAutoObservable(this);
    }

    private setLoading(value: boolean): void {
        this.loading = value;
    }

    private setBranchTableData(value: IBranch[] | []): void {
        this.branchTableData = value;
    }

    private setTotalRecords(value: number): void {
        this.totalRecords = value;
    }
    private setEditingData(value: IBranch) {
        this.editData = value;
    }

    public async getBranchTableData(pageFilter?: IPageFilter<{ city: string }>): Promise<void> {
        this.setLoading(true);
        this.setBranchTableData([]);
        try {
            const response = await axios.get<IObjectResponse<IBranch[]>>('/api/Branch', { params: pageFilter });
            this.setBranchTableData(response.data.data);
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

    public async addBranch(value: IBranch) {
        this.setLoading(true);

        try {
            await axios.post('/api/Branch', { ...value, createdOn: new Date() });
            NotificationManager.success('Branch Added');
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
    public async getEditingData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            const response = await axios.get(`/api/Branch/${id}`);
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

    public async getEditedData(id: number, value: IBranch): Promise<void> {
        this.setLoading(true);

        try {
            await axios.put(`/api/Branch/api/Branch/PutBranch?id=${id}`, {
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

    public async updateSwitch(state: boolean, id: number) {
        this.setLoading(true);

        try {
            await axios.put(`api/Branch/api/Branch/PutStatusBranch?id=${id}`, { isActive: state });
            if (state) {
                NotificationManager.success('Activated', '', 3000);
            } else {
                NotificationManager.success('Deactivated', '', 3000);
            }
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
