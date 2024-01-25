import axios from 'axios';
import { config } from 'dotenv';

import { AttendanceStore } from './AttendanceStore';
import { AuthStore } from './AuthStore';
import { BillingDetailsStore } from './BillingDetailsStore';
import { BranchStore } from './BranchStore';
import { ClassesStore } from './ClassesStore';
import { CommonApiStore } from './CommonApiStore';
import { DesignationStore } from './DesignationStore';
import { DiscountFormStore } from './DiscountFormStore';
import { EnquiryStore } from './EnquiryStore';
import { MarketingStore } from './MarketingStore';
import { MembershipStore } from './MembershipStore';
import { MembersStore } from './MembersStore';
import { OfferStore } from './OfferStore';
import { ReportStore } from './ReportStore';
import { SetupStore } from './SetupStore';
import { StaffStore } from './StaffStore';
import { TraineeStore } from './TraineeStore';

config();

export class RootStore {
    public authStore: AuthStore;
    public membersStore: MembersStore;
    public setupStore: SetupStore;
    public staffStore: StaffStore;
    public enquiryStore: EnquiryStore;
    public offerStore: OfferStore;
    public billingdetailsStore: BillingDetailsStore;
    public marketingStore: MarketingStore;
    public discountFormStore: DiscountFormStore;
    public commonApiStore: CommonApiStore;
    public branchStore: BranchStore;
    public reportStore: ReportStore;
    public designationStore: DesignationStore;
    public membershipStore: MembershipStore;
    public classesStore: ClassesStore;
    public traineeStore: TraineeStore;
    public attendanceStore: AttendanceStore;
    public constructor() {
        axios.defaults.timeout = 15000;
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.interceptors.request.use(function (config) {
            console.debug(`Initiating ${config.method} request to '${config.url}'`, { config });

            return config;
        });
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error) => {
                const config = error.config;
                if (
                    config.url !== '/api/Auth/refresh-token' &&
                    error.config &&
                    !error.config.__isRetry &&
                    error.response.status === 401 &&
                    !config.retried
                ) {
                    await axios.post('/api/Auth/refresh-token');
                    config.retried = true;
                    return axios(config);
                }
                return Promise.reject(error);
            }
        );

        this.authStore = new AuthStore();
        this.membersStore = new MembersStore();
        this.setupStore = new SetupStore();
        this.staffStore = new StaffStore();
        this.enquiryStore = new EnquiryStore();
        this.offerStore = new OfferStore();
        this.billingdetailsStore = new BillingDetailsStore();
        this.marketingStore = new MarketingStore();
        this.discountFormStore = new DiscountFormStore();
        this.commonApiStore = new CommonApiStore();
        this.branchStore = new BranchStore();
        this.reportStore = new ReportStore();
        this.designationStore = new DesignationStore();
        this.membershipStore = new MembershipStore();
        this.classesStore = new ClassesStore();
        this.traineeStore = new TraineeStore();
        this.attendanceStore = new AttendanceStore();
    }
}
