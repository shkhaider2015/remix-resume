import { LinksFunction, LoaderFunction } from "@remix-run/node";
import worStyleHref from "./work.css?url";
import Carousal from "~/components/Carousal/Carousal";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import i18next from "~/locales/i18next.server";
import { IServerProps } from "~/utils/interfaces/routes";
import { workItems } from "~/data";
import { IWorkItem } from "~/utils/interfaces/components";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: worStyleHref },
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
  let t = await i18next.getFixedT(locale, "work");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      // items: items.map((item: IWorkItem, index: number) => ({
      //   ...workItems[index],
      //   title: item.title,
      //   desc: item.desc,
      // })),
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
  i18n: "work",
};

export default function Work() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="work-container">
      <h1 className="screen-title">{data.title}</h1>
      <div className="work-items">
        <Carousal />
      </div>
    </div>
  );
}
