import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { blogPosts } from "~/assets/data/data.server";
import blogStyleHref from "./slug.css?url";
import { ApiResponse } from "~/utils/interfaces/functions";
import React from "react";
import CodeBlock from "~/components/CodeBlock/CodeBlock";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: blogStyleHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel Haider's Blog" },
    { name: "description", content: "Shakeel Haider's Blog" },
    { name: "keywords", content: "blog, shakeel haider, article, blogs, articles" },
    { name: "author", content: "Shakeel Haider" },
  ];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<ApiResponse<BlogPost>> => {
  const slug = params.slug;

  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    const errorResponse: ApiResponse<BlogPost> = {
      status: "error",
      message: "Post not found",
      data: null,
    };
    return errorResponse;
  }

  const successResponse: ApiResponse<BlogPost> = {
    status: "success",
    message: "Post fetched successfully",
    data: post,
  };
  return successResponse;
};

export default function Post() {
  const { data, status, message } = useLoaderData<
    typeof loader
  >() as ApiResponse<BlogPost>;

  if (!data) {
    return (
      <div className="blog-container">
        <h1>Blogs</h1>
        <p>{message}</p>
      </div>
    );
  }

  const { id, title, content } = data;

  return (
    <div className="blog-container">
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
