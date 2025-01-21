import EducationItem from "~/components/EducationItem/EducationItem";

const Education = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion education-desc" >
        Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum
        dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet
        Lorem ipsum dollar sit amet{" "}
      </p>
      <div className="education-items">
        <EducationItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
        <EducationItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
        <EducationItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
        <EducationItem
          date="2019 - 2022"
          title="Full Stack Developer"
          companyName="Retrocue"
        />
      </div>
    </div>
  );
};

export default Education;
