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
    successMessage?: string
}

export interface ISendEmail {
    email: string;
    message?: string;
    service: EService
}