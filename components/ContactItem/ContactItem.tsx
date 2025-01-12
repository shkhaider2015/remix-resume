import { IContactItem } from "utils/interfaces/components";
import "./ContactItem.css";

const ContactItem = (props: IContactItem) => {
  const { label, value, type, Icon } = props;

  const hrefType = () => {
    switch (type) {
      case "EMAIL":
        return "mailto";
      case "PHONE":
        return "tel";
      case "ADDRESS":
        return "https://maps.app.goo.gl/regxwPhaYNoNSoMM6";
      default:
        return "#";
    }
  };

  return (
    <div className="ci-container">
      <div className="icon-con">
        <Icon />
      </div>
      <div className="text-con">
        <div className="label">{label}</div>
        {type === "ADDRESS" ? (
          <address>
            <a href={hrefType()} target="_blank" className="value">{value}</a>
            </address>
        ) : (
          <a href={`${hrefType()}:${value}`} className="value">
            {value}
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
