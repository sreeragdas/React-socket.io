export interface IPushNotification {
    id?: number;
    title: string | undefined;
    message: string | undefined;
    details: string | undefined;
    notifytoMember?: boolean;
    notifytoNonMember?: boolean;
    isActive?: boolean;
    createdBy?: string;
    createdDate?: Date;
}

export interface IPushNotificationPagination {
    PageNumber: number;
    PageSize: number;
}
