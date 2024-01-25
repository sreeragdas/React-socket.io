export interface IAttendanceReport {
    id: number;
    staffMemberName: string;
    checkedInTime: Date;
    checkedOutTime: Date;
}

export interface IAttendanceReportPagination {
    PageNumber: number;
    PageSize: number;
}
