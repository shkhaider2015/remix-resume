import { BASE_URL } from "~/assets/constants";
import { blogPosts } from "~/assets/data";

interface IPage {
  slug: string;
  lastmod: string;
  priority: number;
}

export const loader = () => {
  const base_url = BASE_URL;
  const timezoneOffset = "+05:00";
  const lastMod = new Date().toISOString().replace("Z", timezoneOffset);

  const pages: IPage[] = [
    { slug: "/", lastmod: lastMod, priority: 1.0 },
    { slug: "/services", lastmod: lastMod, priority: 0.8 },
    { slug: "/resume", lastmod: lastMod, priority: 0.9 },
    { slug: "/work", lastmod: lastMod, priority: 0.9 },
    { slug: "/contacts", lastmod: lastMod, priority: 0.7 },
    { slug: "/resume/education", lastmod: lastMod, priority: 0.7 },
    { slug: "/resume/experience", lastmod: lastMod, priority: 0.9 },
    { slug: "/resume/skills", lastmod: lastMod, priority: 0.7 },
    { slug: "/resume/about", lastmod: lastMod, priority: 0.7 },
    { slug: "/resume/download", lastmod: lastMod, priority: 0.8 },
    { slug: "/blog", lastmod: lastMod, priority: 0.8 },
    ...blogPosts.map((post) => ({
      slug: "/blog/" + post.slug,
      lastmod: lastMod,
      priority: 0.7,
    })),
  ];

  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (page) => `<url>
                <loc>${base_url + page.slug}</loc>
                <lastmod>${page.lastmod}</lastmod>
                <priority>${page.priority}</priority>
            </url>`
          )
          .join("")}
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
