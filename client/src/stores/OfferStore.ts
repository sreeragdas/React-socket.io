import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IOfferPagination, IOffers, IResponse } from '../interfaces';
import { IAddOffers } from './../interfaces/IAddOffers';
import { IObjectResponse } from './../interfaces/IObjectResponse';

export class OfferStore {
    public loading: boolean;
    public offerTableData: IOffers[];

    public offerData: IOffers | null;
    public totalRecord: number;
    public editData: IOffers | null;

    public constructor() {
        this.loading = false;
        this.offerTableData = [];
        this.offerData = null;
        this.totalRecord = 0;
        this.editData = null;
        makeAutoObservable(this);
    }

    private setLoading(state: boolean) {
        this.loading = state;
    }
    private setOfferTableData(value: IOffers[]): void {
        this.offerTableData = value;
    }

    private setOfferData(value: IOffers | null): void {
        this.offerData = value;
    }

    private setTotalRecord(value: number) {
        this.totalRecord = value;
    }

    private setEditingData(value: IOffers): void {
        this.editData = value;
    }

    public async getOfferTableData(pagination: IOfferPagination): Promise<void> {
        this.setLoading(true);
        const { PageNumber, PageSize } = pagination;
        try {
            const response = await axios.get<IObjectResponse<IOffers[]>>('/api/BusiOffer', { params: { PageNumber, PageSize } });
            this.setOfferTableData(response.data.data);
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

    public async deleteOfferTableData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            await axios.delete<IResponse>(`/api/BusiOffer/${id}`);
            NotificationManager.success('Successfully deleted...', '', 3000);
        } catch (error) {
            console.error('Deleting offer data failed!...', { error });
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
            const response = await axios.get<IOffers>(`/api/BusiOffer/${id}`);
            this.setEditingData(response.data);
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

    public async getEditedData(id: number, value: IAddOffers): Promise<void> {
        this.setLoading(true);

        try {
            await axios.put<IResponse>(`/api/BusiOffer/api/BusiOffer/PutBusiOffer?id=${id}`, {
                ...value,
                createdOn: new Date(),
                createdBy: new Date(),
                updatedOn: new Date(),
                updatedBy: new Date(),
            });
            NotificationManager.success('Successfully edited...', '', 3000);
        } catch (error) {
            console.error('editing offer data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    //TODO add offers

    public async addOfferData(data: IAddOffers): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.post<IResponse>('/api/BusiOffer', {
                ...data,
                createdOn: new Date(),
                createdBy: new Date(),
                updatedOn: new Date(),
                updatedBy: new Date(),
                isActive: true,
            });
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

    // public async getOfferData(data: IOffers, id: number): Promise<void> {
    //     this.setLoading(true);

    //     try {
    //         const response = await axios.get<IObjectResponse<IOffers>>(`getOfferDataURl/${id}`);
    //         this.setOfferData(response.data.data);
    //     } catch (error) {
    //         console.log('Getting offer data failed!...', { error });
    //         NotificationManager.error(
    //             (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
    //         );
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }

    // public async updateOfferData(data: IOffers, id: number): Promise<boolean> {
    //     this.setLoading(true);

    //     try {
    //         const response = await axios.post<IResponse>(`updateOfferDataURl/${id}`, data);
    //         NotificationManager.success(response.data.message);
    //         return true;
    //     } catch (error) {
    //         console.log('updating offer data failed!...', { error });
    //         NotificationManager.error(
    //             (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
    //         );
    //     } finally {
    //         this.setLoading(false);
    //     }
    //     return false;
    // }
}
