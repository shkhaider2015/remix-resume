import HomeIcon from "~/assets/icons/Home";
import ServicesIcon from "~/assets/icons/Services";
import ResumeIcon from "~/assets/icons/Resume";
import WorkIcon from "~/assets/icons/Work";
import ContactsIcon from "~/assets/icons/Contacts";
import "./Navbar.css";
import { NavLink } from "@remix-run/react";
import { navData } from "~/data";
import { useState } from "react";
import { BlogIcon } from "~/assets/icon";

const Navbar = ({ locale="en" }: { locale: string }) => {
  const [toggle, setToggle] = useState(false);

  const _toggleMenu = () => {
    setToggle(pS => !pS)
  }

  return (
    <nav className="navbar">
      <div
        className={`hamburger ${toggle ? "toggle" : ""} `}
        onClick={_toggleMenu}
      >
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>
      <div className="mobile-nav">
        {navData.map((navItem) => (
          <NavLink
            key={navItem.label}
            to={`${locale}/${navItem.name}`}
            className={({ isActive, isPending }) => {
              return `mobile-nav-item ${
                isActive ? "active" : isPending ? "pending" : ""
              }`;
            }}
            onClick={_toggleMenu}
          >
            {navItem.label}
          </NavLink>
        ))}
      </div>
      <HomeIcon name={`${locale}`} label="Home" />
      <ServicesIcon name={`${locale}/services`} label="Services" />
      <ResumeIcon name={`${locale}/resume`} label="Resume" />
      <WorkIcon name={`${locale}/work`} label="Work" />
      <ContactsIcon name={`${locale}/contacts`} label="Contact" />
      <BlogIcon name={`${locale}/blog`} label="Blog" />
    </nav>
  );
};

export default Navbar;
