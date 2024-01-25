export interface IStaff {
    sNo?: string;
    staffID: number;
    staffName: string;
    mailID: string | null;
    attendanceID: string | null;
    adminRights: string | null;
    active: boolean | null;
}
export interface IStaffPagination {
    options: options;
    PageNumber: number;
    PageSize: number;
}
interface options {
    communication: string;
    designation: string;
    adminRights: string;
}

export interface IAddStaff {
    type: string;
    labelName: string;
    name: string;
    className: string;
    value?: string | boolean | number | string[];
    options?: IAddDropdown[] | [] | undefined;
    disabled?: boolean;
    buttonType?: string;
}

interface IAddDropdown {
    name?: string;
    value?: number | string;
}

export interface IAddStaffForm {
    accountNumber: string;
    adminRights: string;
    attendanceId: string;
    contactNumber: string;
    anniversary: string;
    dob: string;
    doj: string;
    designation: string;
    email: string;
    empCategory: string;
    gender: string;
    grade: string;
    hrmsId: string;
    ifsc: string;
    isLoggedIn: boolean;
    fullName: string;
    panCard: string;
    password: string;
    payoutType: string;
    resume: string;
    role: number;
    salary: string;
}

export interface IEditStaffForm extends IAddStaffForm {
    id: number;
    userName: string;
    role: number;
    permissions: number;
    isActive: boolean;
}

export interface ITrainers {
    id: number;
    trainerName: string;
    designation: string;
}
