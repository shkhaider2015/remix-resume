import { MetaFunction } from "@remix-run/react";
import SkillItem from "~/components/SkillItem/SkillItem";
import { skillItems, skillItemsParagraps } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel's Skills" },
    { name: "description", content: "Shakeel's Skills" },
    {
      name: "keywords",
      content: `skills, shakeel haider, web development, software development, UI/UX Design, DevOps, Development, operation ${skillItems.map(
        (item) => item.name
      )} `,
    },
    { name: "author", content: "Shakeel Haider" },
  ];
};

const Skills = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion sills-desc">{skillItemsParagraps}</p>
      <div className="skills-items">
        {skillItems.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
