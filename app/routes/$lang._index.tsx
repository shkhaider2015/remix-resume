import { LinksFunction, LoaderFunction } from "@remix-run/node";
import indexStylesHref from "./_index.css?url";
import {
  ProfilePictreDarkerReduce,
  ProfilePictreLightReduce,
} from "~/assets/images";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { socialLinks } from "~/data";
import { useTheme } from "~/context/theme";
import i18next from "~/locales/i18next.server";
import { IServerProps } from "~/utils/interfaces/routes";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import { useTranslation } from "react-i18next";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStylesHref },
];

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
  console.log("Loader locale:", locale);
  let t = await i18next.getFixedT(locale, "home");

  let data: IServerProps = {
    data: {
      title: t("data.title"),
      role: t("data.role"),
      description: t("data.description"),
      cta: t("data.cta"),
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
  i18n: "home",
};

const ProfilePicture = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("home");
  const isLightMode = theme === "light";

  return (
    <picture>
      <source
        srcSet={
          isLightMode ? ProfilePictreLightReduce : ProfilePictreDarkerReduce
        }
        media="(prefers-color-scheme: dark)"
      />
      <img
        src={isLightMode ? ProfilePictreLightReduce : ProfilePictreDarkerReduce}
        alt={t("others.profile_picture_alt")}
      />
    </picture>
  );
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="home-container">
      <div className="home-section home-left">
        <h1>{data.title}</h1>
        <h3>{data.role}</h3>
        <p>{data.description}
          <br /> <span>{data.cta}</span>
        </p>
        <div className="socials">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank">
              {<link.Icon />}
            </a>
          ))}
        </div>
      </div>
      <div className="home-section home-right">
        <div className="circle">
          <div className="inner-circle">
            <ProfilePicture />
          </div>
        </div>
      </div>
    </div>
  );
}
