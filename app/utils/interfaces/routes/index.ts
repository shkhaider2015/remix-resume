export interface INavItem {
    name: string;
    label: string;
}

export interface IServerProps {
    data: any;
    meta: { title: string; description: string; keywords: string; author: string };
}

export interface IResumeAboutItem {
    title: string;
    description: string;
}