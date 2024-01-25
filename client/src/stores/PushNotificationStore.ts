import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IPushNotification, IPushNotificationPagination } from './../interfaces/IPushNotification';

export class PushNotificationStore {
    public pushNotification: IPushNotification[] | [];
    public totalRecord: number;
    public editData: IPushNotification | null;
    public constructor() {
        this.pushNotification = [];
        this.loading = false;
        this.totalRecord = 0;
        this.editData = null;
        makeAutoObservable(this);
    }

    private setPushNotification(value: IPushNotification[]) {
        this.pushNotification = value;
    }

    public loading: boolean;
    public setLoading(value: boolean) {
        this.loading = value;
    }
    private setTotalRecord(value: number) {
        this.totalRecord = value;
    }
    private setEditingData(value: IPushNotification) {
        this.editData = value;
    }

    public async getPushTableData(pagination: IPushNotificationPagination) {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/PushNotification', { params: pagination });
            this.setPushNotification(response.data.data);
            this.setTotalRecord(response.data.totalRecords);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async postPushNotification(data: IPushNotification) {
        this.setLoading(true);
        try {
            await axios.post('/api/PushNotification', {
                ...data,
                createdBy: 'don',
                createdDate: new Date(),
            });

            NotificationManager.success('Message sent', '', 3000);
            // NotificationManager.success(response.data.message);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async deleteNotificationData(id: number): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.delete(`/api/PushNotification/${id}`);
            NotificationManager.success('successfully deleted...');
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

    public async updateSwitch(state: boolean, id: number) {
        this.setLoading(true);

        try {
            await axios.put(`api/PushNotification/api/PushNotification/PutStatusPushNotification?id=${id}`, { isActive: state });
            if (state === true) {
                NotificationManager.success('Activated...!');
            } else {
                NotificationManager.success('Deactivated...!');
            }
        } catch (error) {
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
            const response = await axios.get(`/api/PushNotification/${id}`);
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

    public async getEditedData(id: number, value: IPushNotification): Promise<void> {
        this.setLoading(true);

        try {
            await axios.put(`/api/PushNotification/api/PushNotification/PutBranch?id=${id}`, value);
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
