import EducationItem from "~/components/EducationItem/EducationItem";
import { educationItem, educationParagraph } from "~/data";

const Education = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion education-desc">{educationParagraph}</p>
      <div className="education-items">
        {educationItem.map((edu) => (
          <EducationItem key={edu.date} {...edu} />
        ))}
      </div>
    </div>
  );
};

export default Education;
