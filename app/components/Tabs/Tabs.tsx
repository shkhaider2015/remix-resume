import { NavLink } from "@remix-run/react";
import "./Tabs.css";

const Tabs = () => {
  return (
    <nav className="tabs-container">
      <NavLink
        to={"experience"}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        
      >
        Experience
      </NavLink>
      <NavLink
        to={"education"}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        Education
      </NavLink>
      <NavLink
        to={"skills"}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        Skills
      </NavLink>
      <NavLink
        to={"about"}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        About Me
      </NavLink>
    </nav>
  );
};

export default Tabs;
