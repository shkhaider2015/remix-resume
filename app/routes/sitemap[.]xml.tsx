import { LoaderFunctionArgs } from "@remix-run/node";
import { BASE_URL, SUPPORTED_LOCALES } from "~/assets/constants";
import i18next from "~/locales/i18next.server";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";

interface IPage {
  slug: string;
  lastmod: string;
  priority: number;
  pathWithoutLocale: string;
}

export const loader = async () => {
  const base_url = BASE_URL;
  const timezoneOffset = "+05:00";
  const lastMod = new Date().toISOString().replace("Z", timezoneOffset);
  let pages: IPage[] = [];
  
  // Get blog slugs from the first supported locale (assuming they are consistent)
  let t = await i18next.getFixedT(SUPPORTED_LOCALES[0], "blog");
  const blogPosts: any[] = t("data.items", { returnObjects: true }) as any[];
  const blogSlugs: string[] = blogPosts.map(item => item.slug);
  
  // Define static paths (without locale)
  const staticPaths = [
    "",
    "/services",
    "/resume",
    "/work",
    "/contacts",
    "/resume/education",
    "/resume/certifications",
    "/resume/experience",
    "/resume/skills",
    "/resume/about",
    "/resume/download",
    "/blog",
  ];

  SUPPORTED_LOCALES.forEach(lang => {
    // Add static pages
    staticPaths.forEach(path => {
      pages.push({
        slug: `/${lang}${path}`,
        pathWithoutLocale: path,
        lastmod: lastMod,
        priority: path === "" ? 1.0 : 0.8,
      });
    });

    // Add blog posts
    blogSlugs.forEach(slug => {
      pages.push({
        slug: `/${lang}/blog/${slug}`,
        pathWithoutLocale: `/blog/${slug}`,
        lastmod: lastMod,
        priority: 0.7,
      });
    });
  });

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages.map(page => {
    return `
  <url>
    <loc>${base_url}${page.slug}</loc>
    ${SUPPORTED_LOCALES.map(lang => 
      `<xhtml:link rel="alternate" hreflang="${lang}" href="${base_url}/${lang}${page.pathWithoutLocale}" />`
    ).join("\n    ")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${base_url}/en${page.pathWithoutLocale}" />
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`;
  }).join("")}
</urlset>`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
