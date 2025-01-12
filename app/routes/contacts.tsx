import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import contactsStyleHref from "./conntacts.css?url";
import InputField from "components/InputField/InputField";
import TextareaInputField from "components/TextareaInputField/TextareaInputField";
import Button from "components/Button/Button";
import SelectField from "components/SelectField/SelectField";
import { IOption } from "utils/interfaces/components";
import ContactItem from "components/ContactItem/ContactItem";
import { contacts } from "~/data";
import { Form } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: contactsStyleHref },
];

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  
  console.log("Submit : ", formData.entries())

  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);
  return null
};

export default function Contacts() {
  const options: IOption[] = [
    {
      label: "Web Development",
      value: "web-development",
    },
    {
      label: "Mobile Development",
      value: "mobile-development",
    },
    {
      label: "UI/UX Design",
      value: "ui-ux-design",
    },
    {
      label: "DevOps",
      value: "dev-ops",
    },
  ];

  return (
    <div className="contacts-container">
      <h1 className="screen-title">Contacts</h1>
      <div className="contacts-content">
        <div className="form-con">
          <Form id="contact-form" method="post">
            <h4 className="title">Let’s Work Together</h4>
            <h5 className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              aliquam in consequuntur laboriosam repellendus ipsa itaque ab
              libero eos iste culpa quisquam ipsum voluptate saepe id,
              exercitationem ullam harum commodi.
            </h5>
            <div className="fields">
              <InputField name="firstName" type="text" autoCapitalize="on" placeholder="First Name" required />
              <InputField name="lastName" type="text" autoCapitalize="on" placeholder="Last Name" required />
            </div>
            <div className="fields">
              <InputField name="email" type="email" placeholder="Email" required />
              <InputField name="phone" type="tel" placeholder="Phone No." />
            </div>
            <SelectField
              name="service"
              placeholder="Select Sevice"
              options={options}
              onChange={(e) => console.log("e ", e)}
            />
            <TextareaInputField placeholder="Message" />
            <div className="btn-con">
              <Button onClick={() => {
                document.querySelector("form")?.submit();
              }} label="Send" width={"40%"} />
            </div>
          </Form>
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
