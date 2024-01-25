import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IMembership, IMembershipPagination, IMembershipPost } from './../interfaces/IMembership';

export class MembershipStore {
    public loading: boolean;
    public membershipTableData: IMembership[];
    public totalRecord: number;

    public constructor() {
        this.loading = false;
        this.totalRecord = 0;
        this.membershipTableData = [];
        makeAutoObservable(this);
    }
    private setLoading(value: boolean) {
        this.loading = value;
    }
    private setMembershipTableData(value: IMembership[]) {
        this.membershipTableData = value;
    }
    private setTotalRecord(value: number) {
        this.totalRecord = value;
    }
    public async getMembershipTableData(pagination: IMembershipPagination) {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Memberships', { params: pagination });
            this.setMembershipTableData(response.data.data);
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

    public async postMemberShipData(values: IMembershipPost) {
        this.setLoading(true);
        try {
            await axios.post('/api/Memberships', values);
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
    }
}
