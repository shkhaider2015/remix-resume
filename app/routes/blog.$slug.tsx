import { LoaderFunction, redirect } from "@remix-run/node";
import i18next from "~/locales/i18next.server";

export const loader:LoaderFunction = async ({ request, params }) => {
  let lng = await i18next.getLocale(request);
  let slug = params.slug;
  // 301 = permanent redirect — signals to Google that /blog/:slug always maps to /:lang/blog/:slug
  return redirect(`/${lng}/blog/${slug}`, 301);
};