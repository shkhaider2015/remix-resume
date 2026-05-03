import { useEffect } from "react";
import { init, browserTracingIntegration } from "@sentry/remix";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";
import i18n from "./locales/i18n"; // The configuration file we created
import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

init({
    dsn: "https://3ef6c2cee7b29ffc322a08fcecfc1538@o4511326897963008.ingest.us.sentry.io/4511326900846592",
    tracesSampleRate: 1,
    enableLogs: true,

    integrations: [browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches
    })],

    sendDefaultPii: true
})

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n, // The same config we created for the server
    ns: [], // Get the initial namespaces from the server
    backend: {
      loadPath: "/locales/translations/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["htmlTag"],
      caches: [],
    },
  })
  .then(() => {
    // After i18next init, hydrate the app
    hydrateRoot(
      document,
      // Wrap RemixBrowser in I18nextProvider
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>
    );
  });