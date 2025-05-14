import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import contactsStyleHref from "./conntacts.css?url";
import InputField from "~/components/InputField/InputField";
import TextareaInputField from "~/components/TextareaInputField/TextareaInputField";
import Button from "~/components/Button/Button";
import SelectField from "~/components/SelectField/SelectField";
import { EService, IOption } from "~/utils/interfaces/components";
import ContactItem from "~/components/ContactItem/ContactItem";
import { contacts } from "~/data";
import {
  MetaFunction,
  useFetcher,
  useNavigate,
} from "@remix-run/react";
import {
  IContactActionResponse,
  IContactForm,
  IContactFormError,
} from "~/utils/interfaces/functions";
import nodemailer from "nodemailer";
import Loader from "~/components/Loader/Loader";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: contactsStyleHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel Haider's Contacts" },
    { name: "description", content: "Shakeel Haider's Contacts" },
    {
      name: "keywords",
      content:
        "contacts, shakeel haider, web developer, software developer, software engineer",
    },
    { name: "author", content: "Shakeel Haider" },
  ];
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs): Promise<IContactActionResponse> => {
  // invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const recaptchaToken = formData.get("_captcha");

  // Verify with Google
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const verification = await response.json();

  console.log("verification", verification);

  if (!verification.success) {
    return { message: "reCAPTCHA verification failed. Please try again." };
  }

  const data = Object.fromEntries(formData) as unknown as IContactForm;

  const errors: IContactFormError | undefined = {};

  if (data.email === "") errors.email = "Please enter your email";
  if ((data.service as any) === "") errors.service = "Please select service";

  if (Object.keys(errors).length > 0)
    return {
      error: errors as unknown as IContactForm,
      message: "Please fill all the required fields",
    };

  const sendEmail = await _sendEmail(data);

  if (!sendEmail)
    return {
      message: "Something wrong happened!",
    };
  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);
  return {
    message:
      "Thank you for reaching out. I will get back to you at the earliest opportunity. ❤️❤️",
  };
};

const _sendEmail = async (data: IContactForm): Promise<boolean> => {
  try {
    const SMTP_Email = process.env.EMAIL_USER_SMTP;
    const SMTP_PASSWORD = process.env.EMAIL_PASSWORD_SMTP;
    const MY_EMAIL = process.env.SENDER_EMAIL;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_Email,
        pass: SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Resume" <${MY_EMAIL}`, // sender address
      to: MY_EMAIL, // list of receivers
      subject: "Through Your Resume 🚀", // Subject line
      text: `${data.message}`, // plain text body
      html: `<div>Hi, <b>Shakeel</b>
        <h3>You have new message through your resume</h3>
        <h5>Here are the details of client </h5>
        <div>
          <div>First Name : ${data.firstName} - Last Name : ${data.lastName}  </div>
          <div>Email : ${data.email} </div>
          <div>Phone : ${data.phone} </div>
          <div>Service : ${data.service} </div>
          <div>Message : ${data.message} </div>
        </div>
      </div>`, // html body
    });
    return true;
  } catch (error: any) {
    console.log("Error SMTP : ", error);
    return false;
  }
};

export default function Contacts() {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const actionData = fetcher.data as any;
  const options: IOption[] = [
    {
      label: "Web Development",
      value: EService.WEB_DEVELOPMENT,
    },
    {
      label: "Mobile Development",
      value: EService.MOBILE_DEVELOPMENT,
    },
    {
      label: "UI/UX Design",
      value: EService.UI_UX_DESIGN,
    },
    {
      label: "DevOps",
      value: EService.DEV_OPS,
    },
  ];

  const [captchaToken, setCaptchaToken] = useState<string>("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("submit");
    setCaptchaToken(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!actionData?.error && actionData?.message) {
      timer = setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [actionData]);

  return (
    <div className="contacts-container">
      {actionData?.message && (
        <div className={actionData?.error ? "error" : "success"}>
          {actionData?.message}
        </div>
      )}
      <Loader isSubmitting={fetcher.state !== "idle"} />
      <h1 className="screen-title">CONTACTS</h1>
      <div className="contacts-content">
        <div className="form-con">
          <fetcher.Form method="POST">
            <h4 className="title">Let's Work Together</h4>
            <h5 className="desc">
              I am available for freelance work. Connect with me through the
              form below or email me directly at given email.
            </h5>
            <div className="fields">
              <InputField
                name="firstName"
                type="text"
                autoCapitalize="on"
                placeholder="First Name"
                required={true}
              />
              <InputField
                name="lastName"
                type="text"
                autoCapitalize="on"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="fields">
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                required
                error={actionData?.email}
              />
              <InputField name="phone" type="tel" placeholder="Phone No." />
            </div>
            <SelectField
              name="service"
              placeholder="Select Sevice"
              options={options}
              error={actionData?.service}
              onChange={(e) => {
                console.log("e ");
              }}
            />
            <TextareaInputField
              name="message"
              placeholder="Message"
              required={true}
            />

            <input type="hidden" name="_captcha" value={captchaToken}></input>

            {/* { actionData?.message ? <p>{actionData.message}</p> : null} */}
            <div className="btn-con">
              <Button
                type="submit"
                label="Send"
                width={"40%"}
                onSubmit={() => handleReCaptchaVerify()}
              />
            </div>
          </fetcher.Form>
        </div>
        <div className="contacts-list">
          {contacts.map((item) => (
            <ContactItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
