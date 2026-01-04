import { LoaderFunction, redirect } from "@remix-run/node";
import i18next from "~/locales/i18next.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  // Check if the current path is `/resume`
  if (url.pathname === "/resume" || url.pathname === "/resume/") {
    let lng = await i18next.getLocale(request);
    return redirect(`/${lng}/resume/experience`);
  }

  // If not `/resume` or `/resume/`, do nothing (allow the route to render as-is)
  return null;
};
