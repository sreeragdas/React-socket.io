import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IObjectResponse } from '../interfaces';
import { IService } from '../interfaces/IService';

export class CommonApiStore {
    public loading: boolean;
    public totalRecords: number;
    public serviceOption: IService[] | [];

    public constructor() {
        this.loading = false;
        this.totalRecords = 0;
        this.serviceOption = [];
        makeAutoObservable(this);
    }

    private setLoading(state: boolean) {
        this.loading = state;
    }
    private setServiceOption(value: IService[]) {
        this.serviceOption = value;
    }
    private setTotalRecords(value: number): void {
        this.totalRecords = value;
    }

    public async getServiceOption() {
        this.setLoading(true);
        try {
            const response = await axios.get<IObjectResponse<IService[]>>('/api/Service');
            this.setServiceOption(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }
}
