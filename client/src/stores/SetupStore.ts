import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IAddActivity, IAddNewService, IAddNewVariation, IObjectResponse, IPageFilter, IResponse, ISetup } from '../interfaces';

export class SetupStore {
    public loading: boolean;
    public setupTableData: ISetup[];
    public totalRecords: number;
    public VariationData: IAddNewVariation | null;
    public serviceData: IAddNewService | null;
    public activityData: IAddActivity | null;

    public constructor() {
        this.loading = false;
        this.setupTableData = [];
        this.totalRecords = 0;
        this.VariationData = null;
        this.serviceData = null;
        this.activityData = null;
        makeAutoObservable(this);
    }

    private setLoading(state: boolean): void {
        this.loading = state;
    }

    private setSetupTableData(value: ISetup[]): void {
        this.setupTableData = value;
    }

    private setTotalRecords(value: number): void {
        this.totalRecords = value;
    }

    private setVariationData(value: IAddNewVariation | null): void {
        this.VariationData = value;
    }

    private setServiceData(value: IAddNewService | null): void {
        this.serviceData = value;
    }

    private setActivityData(value: IAddActivity | null): void {
        this.activityData = value;
    }

    public async getSetupTableData(pageFilter?: IPageFilter): Promise<void> {
        this.setLoading(true);

        try {
            const response = await axios.get<IObjectResponse<ISetup[]>>('/api/SetUp', { params: pageFilter });
            this.setSetupTableData(response.data.data);
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

    public async deleteSetupData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            await axios.delete(`/api/Setup/${id}`);
            NotificationManager.success('Successfully deleted...', '', 3000);
        } catch (error) {
            console.error('Deleting setup data failed!...', { error });
            +NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async updatePromote(state: boolean, dataId: number) {
        this.setLoading(true);
        try {
            await axios.post('urlPath', { params: { state, dataId } });
            NotificationManager.success('Successfully updated...', '', 3000);
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

    public async updateStatus(state: boolean, dataId: number) {
        this.setLoading(true);
        try {
            await axios.post('urlPath', { params: { state, dataId } });
            NotificationManager.success('Successfully updated...', '', 3000);
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

    public async addNewVariation(data: IAddNewVariation): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.post<IResponse>('/api/Variations', data);
            NotificationManager.success('Successfully added...', '', 3000);
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

    public async getVariationData(id: number): Promise<void> {
        this.setLoading(true);
        this.setVariationData(null);

        try {
            const response = await axios.get<IObjectResponse<IAddNewVariation>>(`getVariationDataURL/${id}`);
            this.setVariationData(response.data.data);
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

    public async updateVariationData(id: number, data: IAddNewVariation): Promise<boolean> {
        this.setLoading(true);

        try {
            const response = await axios.post<IResponse>(`updateVariationDataURL/${id}`, data);
            NotificationManager.success(response.data.message, '', 3000);
            return true;
        } catch (error) {
            console.error('Updating variation data failed!...', { error });
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

    public async addNewService(data: IAddNewService): Promise<boolean> {
        this.setLoading(true);
        try {
            await axios.post<IResponse>('/api/service', data);
            NotificationManager.success('Successfully added...', '', 3000);
            return true;
        } catch (error) {
            console.error('Adding new service data failed!...', { error });
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

    public async getServiceData(id: number): Promise<void> {
        this.setLoading(true);
        this.setServiceData(null);

        try {
            const response = await axios.get<IAddNewService>(`getServiceDataURL/${id}`);
            this.setServiceData(response.data);
        } catch (error) {
            console.error('Getting service data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async updateServiceData(id: number, data: IAddNewService): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.post<IResponse>(`updateServiceDataURL/${id}`, data);
            NotificationManager.success('Successfully updated...', '', 3000);
            return true;
        } catch (error) {
            console.error('Updating service data failed!...', { error });
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

    public async addNewActivity(data: IAddActivity): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.post<IResponse>('addNewActivityURL', data);
            NotificationManager.success('successfully added...', '', 3000);
            return true;
        } catch (error) {
            console.error('Adding new activity data failed!...', { error });
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

    public async getActivityData(id: number): Promise<void> {
        this.setLoading(true);
        this.setActivityData(null);

        try {
            await axios.get<IObjectResponse<IAddActivity>>(`getActivityDataURL/${id}`);
            this.setActivityData({
                activityName: '',
            });
        } catch (error) {
            console.error('Getting activity data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async updateActivityData(id: number, data: IAddActivity): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.post<IResponse>(`updateActivityDataURL/${id}`, data);
            NotificationManager.success('Successfully updated...', '', 3000);
            return true;
        } catch (error) {
            console.error('Updating activity data failed!...', { error });
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
}
