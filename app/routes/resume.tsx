import { LinksFunction, LoaderFunction } from "@remix-run/node";
import resumeStyleHref from "./resume.css?url";
import Tabs from "~/components/Tabs/Tabs";
import { Link, MetaFunction, Outlet, redirect } from "@remix-run/react";
import MyImage from "~/components/Image";
import { PDFLogo } from "~/assets/images";
import Loader from "~/components/Loader/Loader";
import { useState } from "react";

// Add css via link
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resumeStyleHref },
];

// Add meta tags
export const meta: MetaFunction = () => {
  return [
    { title: "Shakeel Haider's Resume" },
    { name: "description", content: "Shakeel Haider's Resume" },
    { name: "keywords", content: "portfolio, resume, shakeel haider, cv, curriculum vitae, skills" },
  ];
}
// Add loader function to handle redirects

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  // Check if the current path is `/resume`
  if (url.pathname === "/resume" || url.pathname === "/resume/") {
    return redirect("/resume/experience");
  }

  // If not `/resume` or `/resume/`, do nothing (allow the route to render as-is)
  return null;
};

export default function Resume() {
  const [loading, setLoading] = useState(false);

  const _downloadResume = async () => {
    try {
      setLoading(true);
      const res = await fetch("/resume/download"); // your route returning the PDF
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "shakeel-haider-resume.pdf"; // filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1 className="screen-title">RESUME</h1>
        <MyImage
          className="pdf-logo hoverable"
          src={PDFLogo}
          onClick={() => _downloadResume()}
        />
      </div>
      <Loader isSubmitting={loading} />
      <Tabs />
      <Outlet />
    </div>
  );
}
