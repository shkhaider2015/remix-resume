import { MetaFunction } from "@remix-run/react";
import EducationItem from "~/components/EducationItem/EducationItem";
import { educationItem, educationParagraph } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel's Education" },
    { name: "description", content: "Shakeel's Education" },
    {
      name: "keywords",
      content: `education, shakeel haider, web development, software development, UI/UX Design, DevOps, Development, operation ${educationItem.map(
        (item) => item.title
      )} `,
    },
    { name: "author", content: "Shakeel Haider" },
  ];
};

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
