import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';

import { ILoginData } from '../interfaces/ILoginData';
import { IUser } from '../interfaces/IUser';

export class AuthStore {
    public user: IUser | null;
    public isLoggedIn: boolean;
    public loading: boolean;

    public constructor() {
        this.user = null;
        this.isLoggedIn = false;
        this.loading = false;
        makeAutoObservable(this);
    }

    private setUser(value: IUser | null): void {
        this.user = value;
    }
    public setIsLoggedIn(status: boolean) {
        this.isLoggedIn = status;
    }

    private setLoading(value: boolean): void {
        this.loading = value;
    }

    public async login(data: ILoginData): Promise<boolean> {
        this.setLoading(true);
        this.setUser(null);

        try {
            const response = await axios.post('/api/Auth/login', data);
            this.setUser(response.data);
            this.setIsLoggedIn(true);
            NotificationManager.success('Successfully Logged In....', '', 3000);
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

    // logut

    public async logout(): Promise<void> {
        this.setLoading(true);
        try {
            await axios.post('/api/Auth/LogOut');
            this.setUser(null);
            this.setIsLoggedIn(false);
            NotificationManager.success('Logut Successfully', '', 3000);
        } catch (error) {
            const status = axios.isAxiosError(error) && error.status;
            if (status === 'internal server error' || 'Service Unavailable') {
                NotificationManager.error('Please check your connection', true);
            } else {
                NotificationManager.error(
                    (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                    '',
                    3000
                );
            }
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    public async getUser(): Promise<void> {
        this.setLoading(true);
        this.setUser(null);
        try {
            const response = await axios.get('/api/Auth/GetTokenUserDetails');
            this.setUser(response.data);
            this.setIsLoggedIn(true);
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string)
            );
        } finally {
            this.setLoading(false);
        }
    }
}
