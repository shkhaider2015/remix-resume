import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import contactsStyleHref from "./conntacts.css?url";
import InputField from "~/components/InputField/InputField";
import TextareaInputField from "~/components/TextareaInputField/TextareaInputField";
import Button from "~/components/Button/Button";
import SelectField from "~/components/SelectField/SelectField";
import { EService, IContactItem, IOption } from "~/utils/interfaces/components";
import ContactItem from "~/components/ContactItem/ContactItem";
import { contacts } from "~/data";
import {
  json,
  MetaFunction,
  useFetcher,
  useLoaderData,
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
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import i18next from "~/locales/i18next.server";
import { IServerProps } from "~/utils/interfaces/routes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: contactsStyleHref },
];

export const meta: MetaFunction = ({ data: { meta } }: any) => {
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    {
      name: "keywords",
      content: meta.keywords,
    },
    { name: "author", content: meta.author },
  ];
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs): Promise<IContactActionResponse> => {
  // invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const recaptchaToken = formData.get("_captcha");
  const locale = getLocaleFromUrl(request);
  let t = await i18next.getFixedT(locale, "contacts");

  // Verify with Google
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const verification = await response.json();

  if (!verification.success) {
    return { message: t("data.recaptch_error") };
  }

  const data = Object.fromEntries(formData) as unknown as IContactForm;

  const errors: IContactFormError | undefined = {};

  if (data.email === "") errors.email = t("data.email_error");
  if ((data.service as any) === "") errors.service = t("data.service_error");

  if (Object.keys(errors).length > 0)
    return {
      error: errors as unknown as IContactForm,
      message: t("data.required_error"),
    };

  const sendEmail = await _sendEmail(data);

  if (!sendEmail)
    return {
      message: t("data.something_went_wrong"),
    };
  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);
  return {
    message: t("data.success_message"),
  };
};

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {

  const locale = getLocaleFromUrl(request);
  let t = await i18next.getFixedT(locale, "contacts");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      subtitle: t("data.subtitle"),
      description: t("data.description"),
      webDevelopment: t("data.web_development"),
      mobileDevelopment: t("data.mobile_development"),
      uiUxDesign: t("data.ui_ux_design"),
      devOps: t("data.dev_ops"),
      firstName: t("data.first_name"),
      lastName: t("data.last_name"),
      email: t("data.email"),
      phone: t("data.phone"),
      select_service: t("data.select_service"),
      message: t("data.message"),
      email_label: t("data.email_label"),
      phone_label: t("data.phone_label"),
      address_label: t("data.address_label"),
      button_label: t("data.button_label"),
    },
    meta: {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
      author: t("meta.author"),
    }
  };

  return json({
    ENV: {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
    ...data,
  });
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

export let handle = {
  i18n: "contacts",
};

const ContactScreen = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const { data } = useLoaderData<typeof loader>();
  const actionData = fetcher.data as any;
  const options: IOption[] = [
    {
      label: data?.webDevelopment,
      value: EService.WEB_DEVELOPMENT,
    },
    {
      label: data?.mobileDevelopment,
      value: EService.MOBILE_DEVELOPMENT,
    },
    {
      label: data?.uiUxDesign,
      value: EService.UI_UX_DESIGN,
    },
    {
      label: data?.devOps,
      value: EService.DEV_OPS,
    },
  ];
  const contactItems = contacts.map(item => ({
    ...item,
    label: data?.[item.label as keyof typeof data] || item.label
  }));

  const [captchaToken, setCaptchaToken] = useState<string>("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    try {
      const token = await executeRecaptcha("submit");
      setCaptchaToken(token);
    } catch (error) {
      console.error(error);
    }
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
      <h1 className="screen-title">{data?.title}</h1>
      <div className="contacts-content">
        <div className="form-con">
          <fetcher.Form method="POST">
            <h4 className="title">{data?.subtitle}</h4>
            <h5 className="desc">
              {data?.description}
            </h5>
            <div className="fields">
              <InputField
                name="firstName"
                type="text"
                autoCapitalize="on"
                placeholder={data?.firstName}
                required={true}
              />
              <InputField
                name="lastName"
                type="text"
                autoCapitalize="on"
                placeholder={data?.lastName}
                required
              />
            </div>
            <div className="fields">
              <InputField
                name="email"
                type="email"
                placeholder={data?.email}
                required
                error={actionData?.email}
              />
              <InputField name="phone" type="tel" placeholder={data?.phone} />
            </div>
            <SelectField
              name="service"
              placeholder={data.select_service}
              options={options}
              error={actionData?.service}
              onChange={(e) => {
                console.log("e ");
              }}
            />
            <TextareaInputField
              name="message"
              placeholder={data?.message}
              required={true}
            />

            <input type="hidden" name="_captcha" value={captchaToken}></input>

            {/* { actionData?.message ? <p>{actionData.message}</p> : null} */}
            <div className="btn-con">
              <Button
                type="submit"
                label={data?.button_label}
                width={"40%"}
                onSubmit={() => handleReCaptchaVerify()}
              />
            </div>
          </fetcher.Form>
        </div>
        <div className="contacts-list">
          {contactItems?.map((item:IContactItem) => (
            <ContactItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Contacts() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={ENV.RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <ContactScreen />
    </GoogleReCaptchaProvider>
  );
}
