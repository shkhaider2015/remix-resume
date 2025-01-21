import ExperienceItem from "~/components/ExperienceItem/ExperienceItem";

const Experience = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion experience-desc" >
        Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum
        dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet
        Lorem ipsum dollar sit amet{" "}
      </p>
      <div className="experience-items">
        <ExperienceItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
        <ExperienceItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
        <ExperienceItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
        <ExperienceItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
      </div>
    </div>
  );
};

export default Experience;
