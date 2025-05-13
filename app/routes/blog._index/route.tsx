import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { blogPosts } from "~/assets/data";
import blogStyleHref from "./blog.css?url";
import { BlogListApiResponse } from "~/utils/interfaces/functions";
import MyImage from "~/components/Image";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: blogStyleHref },
];

export const meta: MetaFunction = () => {
  return [{ title: "Shakeel Haider's Blog" }];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<BlogListApiResponse<BlogPost>> => {
  if (!blogPosts) {
    const errorResponse: BlogListApiResponse<BlogPost> = {
      status: "error",
      message: "Post not found",
      data: null,
    };
    return errorResponse;
  }

  const successResponse: BlogListApiResponse<BlogPost> = {
    status: "success",
    message: "Post fetched successfully",
    data: blogPosts,
  };
  return successResponse;
};

export default function Posts() {
  const { data, status, message } = useLoaderData<
    typeof loader
  >() as BlogListApiResponse<BlogPost>;

  return (
    <div className="blog-container">
      <h1 className="screen-title">BLOGS</h1>
      <div className="content">
        {/* <h1>Blogs list</h1> */}
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
