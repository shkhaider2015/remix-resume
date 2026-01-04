import { createInstance } from "i18next";
import Backend from "i18next-fs-backend/cjs";
import { resolve } from "node:path";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "./locales/i18next.server"; // The backend file we created
import i18n from "./locales/i18n"; // The configuration file we created
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { getLocaleFromUrl } from "./utils/functions/functions.server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: any
) {
  // We create a new instance of i18next
  let instance = createInstance();

  // We can detect the specific locale from each request
  //   let lng = await i18next.getLocale(request);
  // Get the specific locale from URL
  const lng = getLocaleFromUrl(request);
  // The namespaces the routes about to render wants to use
  let ns = i18next.getRouteNamespaces(remixContext);

  console.log("Detected locale:", lng);
  console.log("Namespaces to load:", ns);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n, // The config we created
      lng, // The locale we detected from the request
      ns,
      backend: {
        loadPath: resolve("./app/locales/translations/{{lng}}/{{ns}}.json"),
      },
    });

  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
