import { LinksFunction } from "@remix-run/node";
import servicesStyleHref from "./services.css?url";
import ServiceItem from "~/components/ServiceItem/ServiceItem";
import { serviceItems } from "~/data";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: servicesStyleHref },
];

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
