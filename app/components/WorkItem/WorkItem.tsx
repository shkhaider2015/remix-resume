import "./WorkItem.css";
import { IWorkItem } from "~/utils/interfaces/components";

const WorkItem = (props: IWorkItem) => {
  const { count, title, desc, techStack, links, image } = props;

  return (
    <div className="wi-container">
      <div className="left-sec">
        <div className="count">0{count}</div>
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <h5 key={index} >{tech}</h5>
          ))}
        </div>
        <div className="links"></div>
      </div>
      <div className="right-sec">
        <img src={image} alt="Runofshow" />
      </div>
    </div>
  );
};

export default WorkItem;
