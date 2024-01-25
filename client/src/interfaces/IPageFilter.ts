export interface IPageFilter<T = undefined> {
    options?: T extends undefined ? null : T;
    PageNumber: number;
    PageSize: number;
}
