import "./serviceItem.css";
import { IServicesItem } from "~/utils/interfaces/components";

export default function ServiceItem(props: IServicesItem) {
  return (
    <div className="service-item-container">
      <div className="content-con">
        <h4 className="count">0{props.count}</h4>
        <p className="title">{props.title}</p>
        <img className="image" alt={`${props.title} logo`} src={props.imageURI} />
      </div>
    </div>
  );
}
