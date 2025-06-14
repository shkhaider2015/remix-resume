import "./serviceItem.css";
import { IServicesItem } from "~/utils/interfaces/components";

export default function ServiceItem(props: IServicesItem) {
    const bubbles = Array.from({ length: 8 }, (_, i) => (
    <Bubble
      key={i}
      left={Math.random() * 100}
      size={`${6 + Math.random() * 10}px`}
      duration={5 + Math.random() * 2}
    />
  ));
  return (
    <div className="service-item-container">
      <div className="content-con">
      <div className="bubble-container">{bubbles}</div>
        <h4 className="count">0{props.count}</h4>
        <p className="title">{props.title}</p>
        <img className="image" alt={`${props.title} logo`} src={props.imageURI} />
      </div>
    </div>
  );
}

const Bubble = ({ left, duration, size }: any) => {
  return (
    <div
      className="bubble"
      style={{
        left: `${left}%`,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
      }}
    />
  );
};
