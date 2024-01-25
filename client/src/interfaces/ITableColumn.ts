import { ReactNode } from 'react';

export interface ITableColumn {
    title: string;
    field: string;
    render?: (data: string, index: number) => ReactNode;
}
