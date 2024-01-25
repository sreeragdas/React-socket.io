import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { IBiometric, IBiometricFilter } from './../interfaces/IBiometric';

export class BiometricStore {
    public biometricData: IBiometric[] = [];
    private setBiometricData(value: IBiometric[]) {
        this.biometricData = value;
    }
    public loading: boolean;
    public setLoading(value: boolean) {
        this.loading = value;
    }

    public async getBiometricData(dataFilter: IBiometricFilter, page: number, LIMIT: number) {
        this.setLoading(true);
        try {
            const response = await axios.get('path', { params: { dataFilter, page, LIMIT } });
            this.setBiometricData(response.data.data);
        } catch (error) {
            this.setLoading(false);
            this.setBiometricData([]);
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }
    }

    public async deleteBiometricData(data: IBiometric) {
        this.setLoading(true);
        try {
            const response = await axios.delete('path', { params: { data } });
            NotificationManager.success(response.data.message);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }

    public constructor() {
        this.biometricData = [
            {
                id: '1',
                name: 'alpha',
                attendanceId: '727',
                memberId: 'jg8',
                rfid: '7474t',
                fingerPrint: 'thumb',
                face: 'true',
                device: 'bio',
                service: 'trainer',
                status: 'true',
            },
            {
                id: '2',
                name: 'alpha',
                attendanceId: '727',
                memberId: 'jg8',
                rfid: '7474t',
                fingerPrint: 'thumb',
                face: 'true',
                device: 'bio',
                service: 'trainer',
                status: 'true',
            },
            {
                id: '3',
                name: 'alpha',
                attendanceId: '727',
                memberId: 'jg8',
                rfid: '7474t',
                fingerPrint: 'thumb',
                face: 'true',
                device: 'bio',
                service: 'trainer',
                status: 'true',
            },
        ];
        this.loading = false;
        makeAutoObservable(this);
    }
}
