import { ChevronLeft, ChevronRight } from "~/assets/icon";
import WorkItem from "~/components/WorkItem/WorkItem";
import "./Carousal.css";
import { IWorkItem } from "~/utils/interfaces/components";
import { RunofshowImage } from "~/assets/images";
import { useState } from "react";

const data: IWorkItem[] = [
  {
    count: 1,
    title: "Full Stack Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "REact.js", "Redux.js", "Ant Design"],
    links: {},
    image: RunofshowImage,
  },
  {
    count: 2,
    title: "Frontend Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "REact.js", "Redux.js", "Ant Design"],
    links: {},
    image: RunofshowImage,
  },
  {
    count: 3,
    title: "Mobile Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "REact.js", "Redux.js", "Ant Design"],
    links: {},
    image: RunofshowImage,
  },
];

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="carousal-con">
      <div
        className="carousal-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((item, index) => (
          <WorkItem key={index} {...item} />
        ))}
      </div>
      <div className="buttons">
        <div className="prev" onClick={handlePrev}>
          <ChevronLeft />
        </div>
        <div className="next" onClick={handleNext}>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Carousal;
