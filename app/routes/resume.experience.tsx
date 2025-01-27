import ExperienceItem from "~/components/ExperienceItem/ExperienceItem";
import { experienceItems, experienceParagraph } from "~/data";

const Experience = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion experience-desc">{experienceParagraph}</p>
      <div className="experience-items">
        {experienceItems.map((exp) => (
          <ExperienceItem key={exp.title} {...exp} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
