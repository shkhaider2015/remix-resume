import { LinksFunction, LoaderFunction } from "@remix-run/node";
import servicesStyleHref from "./services.css?url";
import ServiceItem from "~/components/ServiceItem/ServiceItem";
import { serviceItems } from "~/data";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import i18next from "~/locales/i18next.server";
import { IServerProps } from "~/utils/interfaces/routes";
import { IServicesItem } from "~/utils/interfaces/components";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: servicesStyleHref },
];

export const meta: MetaFunction = ({ data: { meta } }: any) => {
  return [
    { title: meta.title }, 
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.keywords },
    { name: "author", content: meta.author },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {

  const locale = getLocaleFromUrl(request);
  let t = await i18next.getFixedT(locale, "services");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      items: serviceItems.map(item => ({
        ...item,
        title: t(`data.${item.title}`)
      })),
    },
    meta: {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
      author: t("meta.author"),
    }
  };

  return Response.json({ ...data });
}

export let handle = {
  i18n: "services",
};

export default function Services() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="services-container">
      <h1>{data.title}</h1>
      <div className="services-items">
        {data.items.map((item:IServicesItem) => (
          <ServiceItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
