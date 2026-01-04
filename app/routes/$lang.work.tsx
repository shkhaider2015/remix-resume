import { LinksFunction } from "@remix-run/node";
import worStyleHref from "./work.css?url";
import Carousal from "~/components/Carousal/Carousal";
import { MetaFunction } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: worStyleHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel's Work" },
    { name: "description", content: "Shakeel's Work" },
    { name: "keywords", content: "work, shakeel haider, projects, portfolio" },
    { name: "author", content: "Shakeel Haider" },
  ];
};

export default function Work() {
  return (
    <div className="work-container">
      <h1 className="screen-title">WORK</h1>
      <div className="work-items">
        <Carousal />
      </div>
    </div>
  );
}
