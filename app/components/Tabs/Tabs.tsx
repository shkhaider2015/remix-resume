import { NavLink } from "@remix-run/react";
import "./Tabs.css";
import { useTranslation } from "react-i18next";

const Tabs = () => {
  const { t } = useTranslation("common");
  const _getClasses = ({ isActive, isPending }: any) => {
    return ` ${isActive ? "active" : isPending ? "pending" : ""}`;
  };
  return (
    <nav className="tabs-container">
      <NavLink to={"experience"} className={_getClasses}>
        {t("resume_tabs.experience")}
      </NavLink>
      <NavLink to={"education"} className={_getClasses}>
        {t("resume_tabs.education")}
      </NavLink>
      <NavLink to={"skills"} className={_getClasses}>
        {t("resume_tabs.skills")}
      </NavLink>
      <NavLink to={"about"} className={_getClasses}>
        {t("resume_tabs.about_me")}
      </NavLink>
    </nav>
  );
};

export default Tabs;
