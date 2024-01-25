import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IDiscountForm } from '../interfaces/IDiscountForm';

export class DiscountFormStore {
    public discountForm: IDiscountForm[] | null;
    public loading: boolean;

    public constructor() {
        this.discountForm = null;
        this.loading = false;
        makeAutoObservable(this);
    }

    public setDiscount(value: IDiscountForm[] | null): void {
        this.discountForm = value;
    }
    public setLoading(state: boolean): void {
        this.loading = state;
    }

    public async addDiscountDetails(data: IDiscountForm): Promise<boolean> {
        this.setLoading(true);
        try {
            await axios.post('/api/Discount', {
                ...data,
                createdOn: '2022-10-14T04:41:58.631Z',
                createdBy: 'string',
                isActive: true,
            });
            NotificationManager.success('Successfully added...', '', 3000);
            return true;
        } catch (error) {
            console.error('Error!', { error });
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
