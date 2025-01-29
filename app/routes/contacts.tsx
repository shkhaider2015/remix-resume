import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import contactsStyleHref from "./conntacts.css?url";
import InputField from "~/components/InputField/InputField";
import TextareaInputField from "~/components/TextareaInputField/TextareaInputField";
import Button from "~/components/Button/Button";
import SelectField from "~/components/SelectField/SelectField";
import { EService, IOption } from "~/utils/interfaces/components";
import ContactItem from "~/components/ContactItem/ContactItem";
import { contacts } from "~/data";
import { MetaFunction, useFetcher } from "@remix-run/react";
import { IContactForm, IContactFormError } from "~/utils/interfaces/functions";
import nodemailer from "nodemailer";
import Loader from "~/components/Loader/Loader";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: contactsStyleHref },
];

export const meta: MetaFunction = () => {
  return [{ title: "Shakeel's Contacts" }];
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as IContactForm;

  const errors: IContactFormError | undefined = {};

  if (data.email === "") errors.email = "Please enter your email";
  if ((data.service as any) === "") errors.service = "Please select service";

  if (Object.keys(errors).length > 0) return errors;

  const sendEmail = await _sendEmail(data)
  
  if(!sendEmail) return {
    message: "Something wrong happened!"
  }
  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);
  return {
    message: "Thank you for reaching out. I will get back to you at the earliest opportunity.",
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
    return true
  } catch (error: any) {
    console.log("Error SMTP : ", error);
    return false
  }
};

export default function Contacts() {
  const fetcher = useFetcher<typeof action>();
  const actionData = fetcher.data;
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

  return (
    <div className="contacts-container">
      {actionData?.message && (
        <div className="success">{actionData?.message}</div>
      )}
      <Loader isSubmitting={fetcher.state !== "idle"} />
      <h1 className="screen-title">CONTACTS</h1>
      <div className="contacts-content">
        <div className="form-con">
          <fetcher.Form method="POST">
            <h4 className="title">Let’s Work Together</h4>
            <h5 className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              aliquam in consequuntur laboriosam repellendus ipsa itaque ab
              libero eos iste culpa quisquam ipsum voluptate saepe id,
              exercitationem ullam harum commodi.
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
            <div className="btn-con">
              <Button
                type="submit"
                label="Send"
                width={"40%"}
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
