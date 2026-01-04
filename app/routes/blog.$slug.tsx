import { LoaderFunction, redirect } from "@remix-run/node";
import i18next from "~/locales/i18next.server";

export const loader:LoaderFunction = async ({ request, params }) => {
  // Redirect "/" to "/en"
  let lng = await i18next.getLocale(request);
  let slug = params.slug;
  return redirect(`/${lng}/blog/${slug}`);
};