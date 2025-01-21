import { LinksFunction } from "@remix-run/node";
import worStyleHref from "./work.css?url";
import Carousal from "~/components/Carousal/Carousal";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: worStyleHref },
];

export default function Work() {
  return (
    <div className="work-container">
      <h1 className="screen-title">Work</h1>
      <div className="work-items">
        <Carousal />
      </div>
    </div>
  );
}
