import { ChevronLeft, ChevronRight } from "~/assets/icon";
import WorkItem from "~/components/WorkItem/WorkItem";
import "./Carousal.css";
import { useState } from "react";
import { IWorkItem } from "~/utils/interfaces/components";
import { useTranslation } from "react-i18next";



const Carousal = ({ items }: {items: IWorkItem[]}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { i18n: { dir } } = useTranslation()


  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousal-con">
      <div
        className="carousal-wrapper"
        style={{ transform: dir() === "rtl" ? `translateX(${currentIndex * 100}%)`  : `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <WorkItem key={index}  {...item} />
        ))}
      </div>
      <div className="buttons">
        <div className="prev" onClick={handlePrev}>
          { dir() === "rtl" ? <ChevronRight /> : <ChevronLeft /> }
        </div>
        <div className="next" onClick={handleNext}>
          { dir() === "rtl" ? <ChevronLeft /> : <ChevronRight /> }
        </div>
      </div>
    </div>
  );
};

export default Carousal;
