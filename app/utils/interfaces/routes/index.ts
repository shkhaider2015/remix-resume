import { SupportedLocale } from "~/assets/constants";

export interface INavItem {
    name: string;
    label: string;
    key: string;
}

export interface IServerProps {
    data: any;
    meta: { title: string; description: string; keywords: string; author: string };
}

export interface IResumeAboutItem {
    title: string;
    description: string;
}

export interface ILanguagesData {
    name: string;
    slug: SupportedLocale;
    flag: string;
}