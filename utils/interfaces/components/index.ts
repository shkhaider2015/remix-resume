import React from "react";

export interface NavIconProps {
    width?: number;
    height?: number;
    color?: string;
    color2?: string;
    label?: string;
    selected?: boolean;
    name?: string;
}

export interface IServicesItem {
    id: string;
    count: number;
    title: string;
}

export interface IExperienceItem {
    date: string;
    title: string;
    companyName: string;
}

export interface IWorkItem {
    count: number;
    title: string;
    desc: string;
    techStack: string[];
    links: {
        github?: string;
        web?: string;
    };
    image: string
}

export interface ISelect {
    options: IOption[];
    placeholder?: string;
    onChange: (e:IOption) => void
}

export interface IOption {
    label: string;
    value: string;
}

export interface IContactItem {
    label: string;
    value: string;
    Icon: React.ElementType<any>
}