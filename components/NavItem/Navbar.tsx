import HomeIcon from "assets/icons/Home";
import ServicesIcon from "assets/icons/Services";
import ResumeIcon from "assets/icons/Resume";
import WorkIcon from "assets/icons/Work";
import ContactsIcon from "assets/icons/Contacts";
import { NavLink } from "@remix-run/react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <HomeIcon name="" label="Home" selected={true} />
      <ServicesIcon name="services" label="Services" />
      <ResumeIcon name="resume" label="Resume" />
      <WorkIcon name="work" label="Work" />
      <ContactsIcon name="contacts" label="Contact" />
    </nav>
  );
};

export default Navbar;
