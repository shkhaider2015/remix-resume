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
  imageURI: string;
}

export interface IExperienceItem {
  date: string;
  title: string;
  companyName: string;
}

export interface ISkillItem {
  name: string;
  Icon: React.ElementType<any>;
}

export interface IWorkItem {
  count: number;
  title: string;
  role: string;
  desc: string;
  techStack: ITechStack[];
  links: ILink;
  image: string;
}

interface ILink {
  github?: string;
  web?: string;
  playStore?: string;
  appStore?: string;
}

interface ITechStack {
  name: string;
  url?: string;
 }

export interface ISelect {
  name: string;
  error?: string;
  options: IOption[];
  placeholder?: string;
  onChange: (e: IOption) => void;
}

export interface IOption {
  label: string;
  value: EService;
}

export enum EService {
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  UI_UX_DESIGN = "UI_UX_DESIGN",
  MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
  DEV_OPS = "DEV_OPS",
}

export interface IContactItem {
  label: string;
  value: string;
  type: "EMAIL" | "PHONE" | "ADDRESS";
  Icon: React.ElementType<any>;
}
