import { LinksFunction } from "@remix-run/node";
import indexStylesHref from "./_index.css?url";
import { ProfilePictre } from "~/assets/images";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStylesHref },
];

export default function Index() {
  return (
    <div className="home-container">
      <div className="home-section home-left">
        <h1>Shakeel Haider</h1>
        <h3>Software Developer</h3>
        <p>
          I'm a passionate software developer with over 5 years of experience in
          frontend, backend, and database development. Skilled in creating
          user-friendly interfaces, scalable applications, and efficient data
          solutions, I thrive on solving complex problems and delivering
          high-quality software.<br /> <span>Let's build innovative solutions together! 🚀</span> 
        </p>
      </div>
      <div className="home-section home-right">
        <div className="circle">
          <div className="inner-circle">
            <img src={ProfilePictre} alt="shakeel haider's" />
          </div>
        </div>
      </div>
    </div>
  );
}
