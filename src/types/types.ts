import { IconProp } from '@fortawesome/fontawesome-svg-core';

// interface for the items of the NavBar
export interface NavBarItem {
    key: string;
    label: string;
    path: string;
    icon: IconProp;
}