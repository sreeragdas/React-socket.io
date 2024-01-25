export interface IMembers {
    id: number | null;
    profile: string;
    billing: string;
    address: string;
    memberId: string;
    attendanceId: string;
    appointment: string;
}

export interface IMemberPagination {
    options: IMemberOption;
    PageNumber: number;
    PageSize: number;
}
interface IMemberOption {
    client: string;
    service: string;
}

export interface IMemberCout {
    totalMember: number;
    totalActiveMember: number;
    totalInActiveMember: number;
}
