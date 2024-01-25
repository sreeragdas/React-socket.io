import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IDiscountCodeFilterOptions, IObjectResponse, IPageFilter } from '../interfaces';
import { IAddDiscount } from '../interfaces/IAddDiscount';
import { IDiscount } from './../interfaces/IDiscount';

export class DiscountStore {
    public discountData: IDiscount[];
    public totalRecords: number;
    private setDiscountData(value: IDiscount[]) {
        this.discountData = value;
    }

    public loading: boolean;

    public setLoading(value: boolean) {
        this.loading = value;
    }

    private setTotalRecords(value: number): void {
        this.totalRecords = value;
    }

    public async getDiscountData(pageFilter?: IPageFilter<IDiscountCodeFilterOptions>) {
        this.setLoading(true);
        try {
            const response = await axios.get<IObjectResponse<IDiscount[]>>('/api/Discount', { params: pageFilter });
            this.setDiscountData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            this.setLoading(false);
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async deleteDiscountData(id: number) {
        this.setLoading(true);
        try {
            await axios.delete(`/api/Discount/${id}`);
            NotificationManager.success('Successfully Deleted...', '', 3000);
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

    //Add Discount API  call

    public async postAddDiscount(data: IAddDiscount) {
        this.setLoading(true);
        try {
            await axios.post('path', data);
            NotificationManager.success('Successfully added...', '', 3000);
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

    public constructor() {
        this.discountData = [];
        this.totalRecords = 0;
        this.loading = false;
        makeAutoObservable(this);
    }
}
