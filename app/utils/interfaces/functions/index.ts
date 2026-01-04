import { EService } from "../components";

export interface IContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: EService;
  message?: string;
}

export interface IContactFormError {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export interface IContactActionResponse {
  errorMessage?: string;
  successMessage?: string;
}

export interface ISendEmail {
  email: string;
  message?: string;
  service: EService;
}

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export interface IContactActionResponse {
  error?: string | IContactForm ;
  message: string | undefined;
}

export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: BlogPost | null;
};

export type BlogListApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: BlogPost[] | null;
  isListingPage?: boolean;
};
