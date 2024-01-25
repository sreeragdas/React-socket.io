import { ReactElement } from 'react';

export interface ISidebarItem {
    name: string;
    path: string;
    icon?: ReactElement;
    menuIcon?: ReactElement;
    onClick?: (menu: ISidebarItem, item: ISidebarItem) => void;
    items?: ISidebarItem[];
}
