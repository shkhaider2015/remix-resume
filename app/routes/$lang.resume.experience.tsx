import { LoaderFunction } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import ExperienceItem from "~/components/ExperienceItem/ExperienceItem";
import { experienceItems, experienceParagraph } from "~/data";
import i18next from "~/locales/i18next.server";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import { IExperienceItem } from "~/utils/interfaces/components";
import { IServerProps } from "~/utils/interfaces/routes";

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
  let t = await i18next.getFixedT(locale, "resume.experience");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      description: t("data.description"),
      items: t("data.items", { returnObjects: true }) as IExperienceItem[],
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
  i18n: "resume.experience",
};

const Experience = () => {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="tab-screen-con">
      <p className="descriptiion experience-desc">{data.description}</p>
      <div className="experience-items">
        {data.items.map((exp:IExperienceItem) => (
          <ExperienceItem key={exp.title} {...exp} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
