import SkillItem from "~/components/SkillItem/SkillItem";
import { skillItems, skillItemsParagraps } from "~/data";

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
