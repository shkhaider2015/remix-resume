import { BASE_URL } from "~/assets/constants";

export const loader = () => {
  const base_url = BASE_URL;
  const pages = [
    "/",
    "/services",
    "/resume",
    "/work",
    "/contacts",
    "/resume/education",
    "/resume/experience",
    "/resume/skills",
    "/resume/about",
    "/resume/download",
  ];
  const timezoneOffset = "+05:00";
  const lastMod = new Date().toISOString().replace("Z", timezoneOffset);

  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (page) => `<url>
                <loc>${base_url + page}</loc>
                <lastmod>${lastMod}</lastmod>
                <priority>1.0</priority>
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
