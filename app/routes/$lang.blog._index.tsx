import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData } from "@remix-run/react";
import blogStyleHref from "./blog.css?url";
import { BlogListApiResponse } from "~/utils/interfaces/functions";
import MyImage from "~/components/Image";
import { getLocaleFromUrl } from "~/utils/functions/functions.server";
import i18next from "~/locales/i18next.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: blogStyleHref },
];

export const meta: MetaFunction = ({ data: { meta } }: any) => {
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
}): Promise<BlogListApiResponse<BlogPost>> => {
     const url = new URL(request.url);
    const locale = getLocaleFromUrl(request);
    let t = await i18next.getFixedT(locale, "blog");

    let blogPosts: BlogPost[] = t("data.items", { returnObjects: true }) as unknown as BlogPost[];

  if (!blogPosts) {
    const errorResponse: BlogListApiResponse<BlogPost> = {
      status: "error",
      message: "Post not found",
      data: null,
      pageTitle: t("data.title"),
      meta: t("meta", { returnObjects: true }),
    };
    return errorResponse;
  }

  const successResponse: BlogListApiResponse<BlogPost> = {
    status: "success",
    message: "Post fetched successfully",
    data: blogPosts,
    pageTitle: t("data.title"),
    meta: t("meta", { returnObjects: true }),
  };
  return successResponse;
};

export default function Posts() {
  const { data, status, message, pageTitle } = useLoaderData<
    typeof loader
  >() as BlogListApiResponse<BlogPost>;

  return (
    <div className="blog-container">
      <h1 className="screen-title">{pageTitle}</h1>
      <div className="content">
        {data?.map((post, index) => (
          <PostItem key={index} {...post} />
        ))}
      </div>
    </div>
  );
}

const PostItem = (prop: BlogPost) => {
  const { title, slug, content } = prop;
  const image = content.find((block) => block.type === "image");
  const paragraphs = content.filter((block) => block.type === "paragraph")?.[0];

  return (
    <Link to={slug} className="blog-item">
      {image && (
        <MyImage className="image-con" src={image?.url} alt={image?.alt} />
      )}
      <div className="desc">
        <h1>{title}</h1>
        {paragraphs && (
          <p>
            {paragraphs.text.length > 160
              ? paragraphs?.text.slice(0, 150) + "..."
              : paragraphs.text}
          </p>
        )}
      </div>
    </Link>
  );
};
