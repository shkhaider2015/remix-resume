import { LinksFunction, LoaderFunction } from "@remix-run/node";
import resumeStyleHref from "./resume.css?url";
import Tabs from "~/components/Tabs/Tabs";
import { Outlet, redirect } from "@remix-run/react";

// Add css via link
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resumeStyleHref },
];

export const loader:LoaderFunction = ({ request }) => {
    const url = new URL(request.url);

    // Check if the current path is `/resume`
    if (url.pathname === "/resume") {
      return redirect("/resume/experience");
    }
  
    // If not `/resume`, do nothing (allow the route to render as-is)
    return null;
}

export default function Resume() {
  return (
    <div className="resume-container">
      <h1 className="screen-title">RESUME</h1>
      <Tabs />
      <Outlet />
    </div>
  );
}
