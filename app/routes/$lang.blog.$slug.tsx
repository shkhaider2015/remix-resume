import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import blogStyleHref from "./slug.css?url";
import { ApiResponse } from "~/utils/interfaces/functions";
import CodeBlock from "~/components/CodeBlock/CodeBlock";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import i18next from "~/locales/i18next.server";
import { BASE_URL } from "~/assets/constants";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: blogStyleHref },
];

export const meta: MetaFunction = ({ data : { meta, data } }: any) => {
  const imageUrl = data?.content?.find((b: any) => b.type === "image")?.url;
  const absoluteImage = imageUrl
    ? imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`
    : `${BASE_URL}/portfolio-image.png`;
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.keywords },
    { name: "author", content: meta.author },
    // Article-specific Open Graph
    { property: "og:type", content: "article" },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description },
    { property: "og:image", content: absoluteImage },
    { property: "article:author", content: "Shakeel Haider" },
    { property: "article:published_time", content: data?.createdAt ?? "" },
    { property: "article:modified_time", content: data?.updatedAt ?? "" },
    { property: "article:section", content: "Technology" },
    { property: "article:tag", content: "React, NestJS, TypeScript, Web Development" },
  ];
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<ApiResponse<BlogPost>> => {
  const slug = params.slug;
  const locale = getLocaleFromUrl(request);
  let t = await i18next.getFixedT(locale, "blog");
  let blogPosts: BlogPost[] = t("data.items", { returnObjects: true }) as unknown as BlogPost[];
  let meta = t("meta", { returnObjects: true });

  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  meta = {
    ...meta,
    title: post.title,
  }

  const successResponse: ApiResponse<BlogPost> = {
    status: "success",
    message: "Post fetched successfully",
    data: post,
    meta,
  };
  return successResponse;
};

export default function Post() {
  const { data, status, message, pageTitle } = useLoaderData<
    typeof loader
  >() as ApiResponse<BlogPost>;

  if (!data) {
    return (
      <div className="detail-container">
        <h1>{pageTitle}</h1>
        <p>{message}</p>
      </div>
    );
  }

  const { id, title, content, createdAt } = data;

  // Article JSON-LD schema for rich search snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: {
      "@type": "Person",
      name: "Shakeel Haider",
      url: "https://www.shakeelhaider.com/en",
    },
    publisher: {
      "@type": "Person",
      name: "Shakeel Haider",
      url: "https://www.shakeelhaider.com",
    },
    datePublished: createdAt,
    dateModified: createdAt,
    mainEntityOfPage: { "@type": "WebPage" },
    image: content.find((b: any) => b.type === "image")?.url ?? "/portfolio-image.png",
    articleSection: "Technology",
    keywords: "React, NestJS, TypeScript, Full-Stack Development",
  };

  return (
    <div className="detail-container">
      {/* Inject Article JSON-LD for rich search snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="content">
        <h1 className="h1">{title}</h1>
        {content.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return <p key={index}>{block.text}</p>;
            case "heading":
              // Use h2+ for content headings since h1 is the title above
              const level = Math.min(block.level + 1, 6);
              const HeadingTag =
                `h${level}` as keyof JSX.IntrinsicElements;
              return (
                <HeadingTag className={`h${level}`} key={index}>
                  {block.text}
                </HeadingTag>
              );
            case "list":
              const ListTag = block.style === "ordered" ? "ol" : "ul";
              return (
                <ListTag key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ListTag>
              );
            case "code":
              return (
                <CodeBlock
                  key={index}
                  language={block.language}
                  code={block.code}
                />
              );
            case "image":
              return (
                <figure key={index} className="image-con">
                  <img
                    className="image"
                    src={block.url}
                    alt={block.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    width="800"
                    height="450"
                  />
                  {block.caption && (
                    <figcaption className="caption">{block.caption}</figcaption>
                  )}
                </figure>
              );
            case "quote":
              return (
                <blockquote key={index}>
                  <p>{block.text}</p>
                  {block.author && <cite>{block.author}</cite>}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </article>
    </div>
  );
}
