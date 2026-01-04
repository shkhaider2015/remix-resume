import { LoaderFunction } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import EducationItem from "~/components/EducationItem/EducationItem";
import { educationItem, educationParagraph } from "~/data";
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
  let t = await i18next.getFixedT(locale, "resume.education");

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

  return Response.json({ ...data,  });
}

export let handle = {
  i18n: "resume.education",
};

const Education = () => {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="tab-screen-con">
      <p className="descriptiion education-desc">{data.description}</p>
      <div className="education-items">
        {data.items.map((edu: IExperienceItem) => (
          <EducationItem key={edu.date} {...edu} />
        ))}
      </div>
    </div>
  );
};

export default Education;
