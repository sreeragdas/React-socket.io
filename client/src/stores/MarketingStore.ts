import { DiscountStore } from './DiscountStore';
import { EmailStore } from './EmailStore';
import { OfferStore } from './OfferStore';
import { PushNotificationStore } from './PushNotificationStore';
import { SmsStore } from './SmsStore';

export class MarketingStore {
    public emailStore: EmailStore;
    public smsStore: SmsStore;
    public pushNotificationStore: PushNotificationStore;
    public discountStore: DiscountStore;
    public offersStore: OfferStore;
    public constructor() {
        this.emailStore = new EmailStore();
        this.smsStore = new SmsStore();
        this.pushNotificationStore = new PushNotificationStore();
        this.discountStore = new DiscountStore();
        this.offersStore = new OfferStore();
    }
}
