import SkillItem from "components/SkillItem/SkillItem";

const Skills = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion sills-desc" >
        Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum
        dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet
        Lorem ipsum dollar sit amet{" "}
      </p>
      <div className="skills-items">
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
          .map(key => <SkillItem key={key} />)
        }
      </div>
    </div>
  );
};

export default Skills;
