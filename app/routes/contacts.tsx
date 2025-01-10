import { LinksFunction } from "@remix-run/node";
import contactsStyleHref from "./conntacts.css?url";
import InputField from "components/InputField/InputField";
import TextareaInputField from "components/TextareaInputField/TextareaInputField";
import Button from "components/Button/Button";
import SelectField from "components/SelectField/SelectField";
import { IContactItem, IOption } from "utils/interfaces/components";
import ContactItem from "components/ContactItem/ContactItem";
import { EmailIcon, HomeIcon, LocationIcon, PhoneIcon } from "assets/icon";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: contactsStyleHref },
];

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

  const contacts: IContactItem[] = [
    {
      label: "Email",
      value: "shkhaider2015@gmail.com",
      Icon: EmailIcon,
    },
    {
      label: "Phone No.",
      value: "+92 346 0027852",
      Icon: PhoneIcon,
    },
    {
      label: "Address",
      value: "Banaras, Pathan Colony, Karachi, Pakistan",
      Icon: LocationIcon,
    },
  ];

  return (
    <div className="contacts-container">
      <h1 className="screen-title">contacts</h1>
      <div className="contacts-content">
        <div className="form-con">
          <form action="" method="post">
            <h4 className="title">Let’s Work Together</h4>
            <h5 className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              aliquam in consequuntur laboriosam repellendus ipsa itaque ab
              libero eos iste culpa quisquam ipsum voluptate saepe id,
              exercitationem ullam harum commodi.
            </h5>
            <div className="fields">
              <InputField type="text" placeholder="First Name" required />
              <InputField type="text" placeholder="Last Name" required />
            </div>
            <div className="fields">
              <InputField type="email" placeholder="Email" required />
              <InputField type="tel" placeholder="Phone No." />
            </div>
            <SelectField
              placeholder="Select Sevice"
              options={options}
              onChange={(e) => console.log("e ", e)}
            />
            <TextareaInputField placeholder="Message" />
            <div className="btn-con">
              <Button type="submit" label="Send" width={"40%"} />
            </div>
          </form>
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
