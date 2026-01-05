import { ChevronLeft, ChevronRight } from "~/assets/icon";
import WorkItem from "~/components/WorkItem/WorkItem";
import "./Carousal.css";
import { useState } from "react";
import { workItems } from "~/data";
import { useTranslation } from "react-i18next";
import { IWorkItem } from "~/utils/interfaces/components";
import { i } from "node_modules/vite/dist/node/types.d-aGj9QkWt";



const Carousal = () => {
  const { t } = useTranslation("work");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let translatedItems = t("data.items", { returnObjects: true }) as any[];
  let items = workItems.map((item, index) => ({
    ...item,
    title: translatedItems[index]?.title || item.title,
    desc: translatedItems[index]?.desc || item.desc,
    count: translatedItems[index]?.count || item.count,
  }));


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
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <WorkItem key={index}  {...item} />
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
