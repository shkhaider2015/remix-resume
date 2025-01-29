import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Shakeel's About" }];
};

const About = () => {
  return (
    <div className="tab-screen-con">
      <p className="descriptiion about-desc">
        I am a passionate and dedicated software developer with over 5 years of
        hands-on experience in frontend, backend, and database development. My
        journey in the tech industry has been driven by a deep curiosity for
        problem-solving and a commitment to delivering high-quality, scalable
        solutions. I thrive in dynamic environments where I can leverage my
        technical expertise to create innovative applications that make a real
        impact.
      </p>
      <h3 className="about-header" >Experience</h3>
      <p className="descriptiion about-desc others-desc">
        My career began with an internship at Sky Electric Pvt. Ltd, where I
        gained foundational knowledge in software development and honed my
        problem-solving skills. From there, I progressed to roles at Concept
        Recall Pvt. Ltd as a Jr. Web Developer, where I worked on building and
        maintaining web applications, and later at Retrocube Pvt. Ltd as a Jr.
        Mobile Developer, where I contributed to mobile app development.
        Currently, I serve as the Frontend Lead Developer at RunOfShowApp,
        leading a team to design and implement user-friendly interfaces while
        ensuring seamless user experiences.<br /><br /> In addition to my full-time roles, I
        have been freelancing as a Fullstack Developer since 2020, taking on
        diverse projects that have allowed me to refine my skills in both
        frontend and backend development. My ability to adapt to new
        technologies, collaborate effectively with cross-functional teams, and
        deliver robust solutions has been a cornerstone of my professional
        growth.<br /><br /> I am passionate about coding, problem-solving, and continuous
        learning, which fuels my drive to stay updated with the latest industry
        trends and technologies. Whether it's building scalable backend systems,
        crafting intuitive user interfaces, or optimizing database performance,
        I am committed to delivering excellence in every project I undertake.
      </p>
      <h3 className="about-header">Education</h3>
      <p className="descriptiion about-desc others-desc">
        My educational journey has been the foundation of my career in software
        development. It began with my SSC (Matriculation) from Al Nasir School
        Pvt., where I developed a keen interest in problem-solving and logical
        thinking. This early phase instilled in me the discipline and curiosity
        that would later drive my passion for technology.<br /><br /> I then pursued FSc
        Pre-Engineering at Pakistan Shipowner's College, where I deepened my
        understanding of mathematics, physics, and computer science. This
        intermediate education not only strengthened my analytical skills but
        also solidified my decision to pursue a career in software engineering.<br /><br />
        Building on this foundation, I earned my BS in Software Engineering from
        Indus University Pvt. Ltd. During my undergraduate studies, I gained
        comprehensive knowledge of programming languages, software design, and
        development methodologies. The program equipped me with both theoretical
        and practical expertise, preparing me to tackle real-world challenges in
        the tech industry.<br /><br /> My academic journey has been instrumental in shaping
        my technical skills and fostering a growth mindset. It has provided me
        with the tools to continuously learn, adapt, and excel in the
        ever-evolving field of software development.
      </p>
      <h3 className="about-header">Skills</h3>
      <p className="descriptiion about-desc others-desc">
        I possess a diverse skill set that spans frontend, backend, and database
        development, enabling me to build end-to-end solutions for complex
        problems. On the frontend, I specialize in frameworks like React JS,
        Next JS, and Remix JS, along with tools like Redux, Webpack, and
        Material UI to create responsive and user-friendly interfaces.<br /><br /> For
        backend development, I am proficient in Nest JS, Django, and Flask,
        leveraging these frameworks to build scalable and efficient server-side
        applications. My expertise in Python, JavaScript, and TypeScript allows
        me to write clean, maintainable, and high-performance code.<br /><br /> In database
        management, I have extensive experience working with PostgreSQL, MySQL,
        and MongoDB, designing optimized data storage solutions and ensuring
        seamless integration with applications. Additionally, I am skilled in
        version control using Git and GitHub, and I use Figma for prototyping
        and design collaboration.<br /><br /> I also have experience with TensorFlow for
        machine learning projects, adding a unique dimension to my skill set. My
        ability to adapt to new technologies and tools, combined with my passion
        for continuous learning, makes me a versatile and resourceful developer
        capable of tackling diverse challenges in the tech industry.
      </p>
    </div>
  );
};

export default About;
