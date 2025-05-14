import { LinksFunction } from "@remix-run/node";
import servicesStyleHref from "./services.css?url";
import ServiceItem from "~/components/ServiceItem/ServiceItem";
import { serviceItems } from "~/data";
import { MetaFunction } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: servicesStyleHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel's Services" }, 
    { name: "description", content: "Shakeel's Services" },
    { name: "keywords", content: "services, shakeel haider, web development, software development, UI/UX Design, DevOps, Development, operation" },
    { name: "author", content: "Shakeel Haider" },
  ];
};

export default function Services() {
  return (
    <div className="services-container">
      <h1>SERVICES</h1>
      <div className="services-items">
        {serviceItems.map((item) => (
          <ServiceItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
