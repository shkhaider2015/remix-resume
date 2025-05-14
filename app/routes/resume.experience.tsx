import { MetaFunction } from "@remix-run/react";
import ExperienceItem from "~/components/ExperienceItem/ExperienceItem";
import { experienceItems, experienceParagraph } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel's Experience" },
    { name: "description", content: "Shakeel's Experience" },
    {
      name: "keywords",
      content: `experience, shakeel haider, web development, software development, UI/UX Design, DevOps, Development, operation ${experienceItems.map(
        (item) => item.title
      )} `,
    },
    { name: "author", content: "Shakeel Haider" },
  ];
};

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
