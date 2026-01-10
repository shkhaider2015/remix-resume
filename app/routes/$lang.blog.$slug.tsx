import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import blogStyleHref from "./slug.css?url";
import { ApiResponse } from "~/utils/interfaces/functions";
import CodeBlock from "~/components/CodeBlock/CodeBlock";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import i18next from "~/locales/i18next.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: blogStyleHref },
];

export const meta: MetaFunction = ({ data : { meta } }: any) => {
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.keywords },
    { name: "author", content: meta.author },
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
    const errorResponse: ApiResponse<BlogPost> = {
      status: "error",
      message: "Post not found",
      data: null,
      meta,
    };
    return errorResponse;
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

  const { id, title, content } = data;

  return (
    <div className="detail-container">
      <div className="content">
        {content.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return <p key={index}>{block.text}</p>;
            case "heading":
              const HeadingTag =
                `h${block.level}` as keyof JSX.IntrinsicElements;
              return (
                <HeadingTag className={`h${block.level}`} key={index}>
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
                  <img className="image" src={block.url} alt={block.alt} />
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
      </div>
    </div>
  );
}
