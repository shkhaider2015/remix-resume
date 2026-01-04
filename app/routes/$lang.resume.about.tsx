import { LoaderFunction } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { Trans } from "react-i18next";
import i18next from "~/locales/i18next.server";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import { IResumeAboutItem, IServerProps } from "~/utils/interfaces/routes";

export const meta: MetaFunction = ({ data: { meta } }: any) => {
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    {
      name: "keywords",
      content: meta.keywords,
    },
    { name: "author", content: meta.author },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = getLocaleFromUrl(request);
  let t = await i18next.getFixedT(locale, "resume.about");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      description: t("data.description"),
      items: t("data.items", { returnObjects: true }) as IResumeAboutItem[],
    },
    meta: {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
      author: t("meta.author"),
    },
  };

  return Response.json({ ...data });
};

export let handle = {
  i18n: "resume.about",
};

const About = () => {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="tab-screen-con">
      <p className="descriptiion about-desc">{data.description}</p>
      <div className="about-items">
        {data.items.map((item: IResumeAboutItem) => (
          <div key={item.title}>
            <h3 className="about-header">{item.title}</h3>
            <p className="descriptiion about-desc others-desc">
              <Trans>{item.description}</Trans>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
