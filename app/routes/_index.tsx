import { LinksFunction } from "@remix-run/node";
import indexStylesHref from "./_index.css?url";

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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          atque id voluptate aperiam reprehenderit mollitia cumque doloribus
          sint officiis porro sunt quas voluptas vero pariatur, nostrum officia
          nam error quam.
        </p>
      </div>
      <div className="home-section home-right">
        <div className="circle">
          <div className="inner-circle"></div>
        </div>
      </div>
    </div>
  );
}
