import { BASE_URL, SUPPORTED_LOCALES } from "~/assets/constants";
import i18next from "~/locales/i18next.server";

interface IPage {
  slug: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  pathWithoutLocale: string;
}

export const loader = async () => {
  const base_url = BASE_URL;

  // Use a fixed last-modified date (update this when content changes).
  // A static date prevents Google from thinking your content changes on every crawl.
  const LAST_MODIFIED = "2026-08-29";

  let pages: IPage[] = [];

  // Get blog slugs from the first supported locale (slugs are language-agnostic)
  let t = await i18next.getFixedT(SUPPORTED_LOCALES[0], "blog");
  const blogPosts: any[] = t("data.items", { returnObjects: true }) as any[];
  const blogSlugs: string[] = blogPosts.map((item) => item.slug);

  // Only include real, indexable pages.
  // Excluded: /resume/download (PDF file endpoint — not a web page, causes 404 or non-indexable issues)
  const staticPaths: Array<{ path: string; priority: number; changefreq: string }> = [
    { path: "",                         priority: 1.0, changefreq: "monthly" },
    { path: "/services",                priority: 0.8, changefreq: "monthly" },
    { path: "/work",                    priority: 0.8, changefreq: "monthly" },
    { path: "/contacts",               priority: 0.7, changefreq: "yearly"  },
    { path: "/blog",                    priority: 0.9, changefreq: "weekly"  },
    { path: "/resume/experience",       priority: 0.8, changefreq: "monthly" },
    { path: "/resume/education",        priority: 0.8, changefreq: "yearly"  },
    { path: "/resume/certifications",   priority: 0.8, changefreq: "yearly"  },
    { path: "/resume/skills",           priority: 0.8, changefreq: "monthly" },
    { path: "/resume/about",            priority: 0.8, changefreq: "monthly" },
  ];

  SUPPORTED_LOCALES.forEach((lang) => {
    // Add static pages
    staticPaths.forEach(({ path, priority, changefreq }) => {
      pages.push({
        slug: `/${lang}${path}`,
        pathWithoutLocale: path,
        lastmod: LAST_MODIFIED,
        priority,
        changefreq,
      });
    });

    // Add blog posts
    blogSlugs.forEach((slug) => {
      pages.push({
        slug: `/${lang}/blog/${slug}`,
        pathWithoutLocale: `/blog/${slug}`,
        lastmod: LAST_MODIFIED,
        priority: 0.7,
        changefreq: "monthly",
      });
    });
  });

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
    .map(
      (page) => `
  <url>
    <loc>${base_url}${page.slug}</loc>
    ${SUPPORTED_LOCALES.map(
      (lang) =>
        `<xhtml:link rel="alternate" hreflang="${lang}" href="${base_url}/${lang}${page.pathWithoutLocale}" />`
    ).join("\n    ")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${base_url}/en${page.pathWithoutLocale}" />
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400", // Cache for 1 day
    },
  });
};
