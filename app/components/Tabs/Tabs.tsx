import { NavLink } from "@remix-run/react";
import "./Tabs.css";

const Tabs = () => {
  const _getClasses = ({ isActive, isPending }: any) => {
    return ` ${isActive ? "active" : isPending ? "pending" : ""}`;
  };
  return (
    <nav className="tabs-container">
      <NavLink to={"experience"} className={_getClasses}>
        Experience
      </NavLink>
      <NavLink to={"education"} className={_getClasses}>
        Education
      </NavLink>
      <NavLink to={"skills"} className={_getClasses}>
        Skills
      </NavLink>
      <NavLink to={"about"} className={_getClasses}>
        About Me
      </NavLink>
    </nav>
  );
};

export default Tabs;
