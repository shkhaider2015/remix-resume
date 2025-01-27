import { ChevronLeft, ChevronRight } from "~/assets/icon";
import WorkItem from "~/components/WorkItem/WorkItem";
import "./Carousal.css";
import { useState } from "react";
import { workItems } from "~/data";



const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? workItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === workItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="carousal-con">
      <div
        className="carousal-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {workItems.map((item, index) => (
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
