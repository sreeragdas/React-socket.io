import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IAddMember, IMemberCout, IMemberPagination, IMembers, IObjectResponse, IResponse } from '../interfaces';

export class MembersStore {
    public loading: boolean;
    public membersTableData: IMembers[];
    public memberData: IMembers | null;
    public totalRecords: number;
    public memberCount: IMemberCout | null;

    public constructor() {
        this.loading = false;
        this.membersTableData = [];
        this.memberData = null;
        this.totalRecords = 0;
        this.memberCount = null;

        makeAutoObservable(this);
    }

    private setLoading(state: boolean): void {
        this.loading = state;
    }
    private setMembersTableData(value: IMembers[] | []): void {
        this.membersTableData = value;
    }
    private setMemberData(value: IMembers | null): void {
        this.memberData = value;
    }

    private setTotalRecords(value: number) {
        this.totalRecords = value;
    }

    private setMemberCount(value: IMemberCout) {
        this.memberCount = value;
    }

    public async getMembersTableData(pagination?: IMemberPagination): Promise<void> {
        this.setLoading(true);

        try {
            const response = await axios.get<IObjectResponse<IMembers[]>>('/api/Members', { params: pagination });
            this.setMembersTableData(response.data.data);
            this.setTotalRecords(response.data.totalRecords);
        } catch (error) {
            this.setMembersTableData([]);
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async getMemberCount() {
        this.setLoading(true);
        try {
            const response = await axios.get('/api/Members/GetMembersCount');
            this.setMemberCount(response.data);
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

    public async addMemberData(data: IAddMember): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.post<IResponse>('/api/Members', {
                ...data,
                injuries: JSON.stringify(data['injuries']),
                imageProfile: '',
                active: 1,
            });
            NotificationManager.success('Successfully added...', '', 3000);
            return true;
        } catch (error) {
            console.error('Adding member data failed!...', { error });
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

    public async getMemberData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            const response = await axios.get(`/api/Members/${id}`);
            this.setMemberData(response.data);
        } catch (error) {
            console.error('Getting Member data failed!...', { error });
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async updateMemberData(id: number, data: IAddMember): Promise<boolean> {
        this.setLoading(true);

        try {
            await axios.put<IResponse>(`/api/Members${id}`, data);
            NotificationManager.success('Successfully updated...', '', 3000);
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

    public async deleteMemberData(id: number): Promise<void> {
        this.setLoading(true);

        try {
            await axios.delete<IResponse>(`/api/Members${id}`);
            NotificationManager.success('Successfully deleted...', '', 3000);
        } catch (error) {
            console.error('Deleting member data failed!...', { error });
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
