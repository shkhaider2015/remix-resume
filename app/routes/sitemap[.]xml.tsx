import { LoaderFunctionArgs } from "@remix-run/node";
import { BASE_URL, SUPPORTED_LOCALES } from "~/assets/constants";
import i18next from "~/locales/i18next.server";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";

interface IPage {
  slug: string;
  lastmod: string;
  priority: number;
}

export const loader = async () => {
  const base_url = BASE_URL;
  const timezoneOffset = "+05:00";
  const lastMod = new Date().toISOString().replace("Z", timezoneOffset);
  let pages: IPage[] = [];
  let t = await i18next.getFixedT(SUPPORTED_LOCALES[0], "blog");
  const blogPosts:BlogPost[] = t("data.items", { returnObjects: true }) as unknown as BlogPost[];
  const blogSlugs: string[] = blogPosts.map(item => item.slug);
  
  SUPPORTED_LOCALES.forEach(item => {
    console.log("PPP ", item)
    let data:IPage[] = [
      { slug: `/${item}`, lastmod: lastMod, priority: 1.0 },
    { slug: `/${item}/services`, lastmod: lastMod, priority: 0.8 },
    { slug: `/${item}/resume`, lastmod: lastMod, priority: 0.9 },
    { slug: `/${item}/work`, lastmod: lastMod, priority: 0.9 },
    { slug: `/${item}/contacts`, lastmod: lastMod, priority: 0.7 },
    { slug: `/${item}/resume/education`, lastmod: lastMod, priority: 0.7 },
    { slug: `/${item}/resume/experience`, lastmod: lastMod, priority: 0.9 },
    { slug: `/${item}/resume/skills`, lastmod: lastMod, priority: 0.7 },
    { slug: `/${item}/resume/about`, lastmod: lastMod, priority: 0.7 },
    { slug: `/${item}/resume/download`, lastmod: lastMod, priority: 0.8 },
    { slug: `/${item}/blog`, lastmod: lastMod, priority: 0.8 },
    ...blogSlugs.map((slug) => ({
      slug: `/${item}/blog/` + slug,
      lastmod: lastMod,
      priority: 0.7,
    })),
    ]
    pages.push(...data)
  })

  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages.map(page => {
            return `<url>
                <loc>${base_url + page.slug}</loc>
                <lastmod>${page.lastmod}</lastmod>
                <priority>${page.priority}</priority>
            </url>`
          })}
        </urlset>
      `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
