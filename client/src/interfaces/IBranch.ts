export interface IBranch {
    id: number;
    branchName: string;
    locality: string;
    city: string;
    role: string;
    createdBy: string;
    isActive?: boolean;
    createdOn?: Date;
}
