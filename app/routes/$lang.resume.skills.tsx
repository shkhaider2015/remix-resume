import { LoaderFunction } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import SkillItem from "~/components/SkillItem/SkillItem";
import { skillItems } from "~/data";
import i18next from "~/locales/i18next.server";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
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
  let t = await i18next.getFixedT(locale, "resume.skills");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      description: t("data.description"),
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
  i18n: "resume.skills",
};

const Skills = () => {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="tab-screen-con">
      <p className="descriptiion sills-desc">{data.description}</p>
      <div className="skills-items">
        {skillItems.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
