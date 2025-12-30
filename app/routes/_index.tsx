import { LinksFunction } from "@remix-run/node";
import indexStylesHref from "./_index.css?url";
import { ProfilePictreDarkerReduce, ProfilePictreLightReduce } from "~/assets/images";
import { MetaFunction } from "@remix-run/react";
import { socialLinks } from "~/data";
import { useTheme } from "~/context/theme";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStylesHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel Haider's Portfolio" },
    { name: "description", content: "Shakeel Haider's Portfolio" },
    {
      name: "keywords",
      content:
        "portfolio, shakeel haider, software engineer, web development, software development",
    },
    { name: "author", content: "Shakeel Haider" },
  ];
};

const ProfilePicture = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  return (
    <picture>
      <source srcSet={isLightMode ? ProfilePictreLightReduce : ProfilePictreDarkerReduce} media="(prefers-color-scheme: dark)" />
      <img
        src={isLightMode ? ProfilePictreLightReduce : ProfilePictreDarkerReduce}
        alt="shakeel haider's Profile Picture"
      />
    </picture>
  );
}

export default function Index() {
  return (
    <div className="home-container">
      <div className="home-section home-left">
        <h1>Shakeel Haider</h1>
        <h3>Software Engineer 👨🏻‍💻</h3>
        <p>
          I'm a passionate software engineer with over 5 years of experience in
          🔴 frontend, 🟢 backend, and 🔵 database development. Skilled in
          creating user-friendly interfaces, scalable applications, and
          efficient data solutions, I thrive on solving complex problems and
          delivering high-quality software.
          <br /> <span>Let's build innovative solutions together! 🚀</span>
        </p>
        <div className="socials">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank">
              {<link.Icon />}
            </a>
          ))}
        </div>
      </div>
      <div className="home-section home-right">
        <div className="circle">
          <div className="inner-circle">
            <ProfilePicture />
          </div>
        </div>
      </div>
    </div>
  );
}
