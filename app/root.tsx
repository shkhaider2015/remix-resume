import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";
import {
  isRouteErrorResponse,
  json,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import Navbar from "~/components/NavItem/Navbar";
import Loader from "./components/Loader/Loader";
import {
  BASE_URL,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "./assets/constants";
import { useEffect } from "react";
import { ThemeProvider } from "./context/theme";
import { getThemeFromCookies } from "./utils/theme.server";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import { getLocaleFromUrl } from "./utils/functions/functions.server";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";

export const shouldRevalidate = ({ currentParams, nextParams }: any) => {
  return currentParams.lang !== nextParams.lang;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const theme = getThemeFromCookies(request);
  let locale = getLocaleFromUrl(request);

  return json({
    theme,
    ENV: {
      GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
    },
    locale,
    url: url.href,
    pathname: url.pathname,
  });
};

// JSON-LD structured data — generated once, injected into every page
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shakeel Haider",
  url: BASE_URL,
  image: `${BASE_URL}/portfolio-image.png`,
  jobTitle: "Senior Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "BCDApps",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  email: "shkhaider2015@gmail.com",
  telephone: "+92-346-0027852",
  sameAs: [
    "https://www.linkedin.com/in/shakeel-haider-818233176/",
    "https://github.com/shkhaider2015",
    "https://stackoverflow.com/users/8307195/shakeel-haider",
  ],
  knowsAbout: [
    "React", "React Native", "NestJS", "TypeScript", "JavaScript",
    "Python", "Next.js", "Remix", "AWS", "Docker", "MongoDB", "PostgreSQL",
  ],
  description: "Full-stack and React Native developer with 5+ years of experience building web and mobile applications. Available for freelance and full-time roles.",
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shakeel Haider Portfolio",
  url: BASE_URL,
  author: { "@type": "Person", name: "Shakeel Haider" },
  description: "Portfolio and blog of Shakeel Haider, a Senior Software Engineer specializing in React, React Native, NestJS, and TypeScript.",
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/en/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export let handle = {
  i18n: "common",
};

function App() {
  const { theme, ENV, locale, url, pathname } = useLoaderData<typeof loader>();
  // Get the locale from the loader
  let { i18n } = useTranslation();

  useChangeLanguage(locale);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
    }
  }, []);

  const firstSegment = pathname.split("/")[1];
  const isLocaleInPath = (SUPPORTED_LOCALES as string[]).includes(firstSegment);
  const pathWithoutLocale = isLocaleInPath
    ? pathname.substring(firstSegment.length + 1) || "/"
    : pathname;

  return (
    <ThemeProvider initialTheme={theme}>
      <html lang={locale} dir={i18n.dir()}>
        <head>
          {/* Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ENV.GOOGLE_TAG_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ENV.GOOGLE_TAG_ID}');
              `,
            }}
          />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          {/* Canonical: always point to the English (default) version of the page.
              This tells Google the /en/* URL is the canonical source. Localized
              versions are declared via hreflang, not via individual canonical tags. */}
          <link
            rel="canonical"
            href={`${BASE_URL}/${DEFAULT_LOCALE}${
              pathWithoutLocale === "/" ? "" : pathWithoutLocale
            }`}
          />
          {SUPPORTED_LOCALES.map((lang) => (
            <link
              key={lang}
              rel="alternate"
              hrefLang={lang}
              href={`${BASE_URL}/${lang}${
                pathWithoutLocale === "/" ? "" : pathWithoutLocale
              }`}
            />
          ))}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${BASE_URL}/${DEFAULT_LOCALE}${
              pathWithoutLocale === "/" ? "" : pathWithoutLocale
            }`}
          />

          {/* JSON-LD Structured Data: Person + WebSite schemas */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
          />

          <meta property="og:title" content={"Shakeel Haider | Full-Stack & React Native Developer"} />
          <meta property="og:site_name" content="Shakeel Haider Portfolio" />
          <meta property="og:url" content={url} />
          <meta
            property="og:description"
            content="Explore the portfolio of Shakeel Haider, a skilled full-stack developer specializing in React, React Native, NestJS, TypeScript, and Python. Crafting high-performance web and mobile applications with clean code and modern technologies. Let's build something amazing together!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content={`${locale}_PK`} />
          {SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => (
            <meta key={l} property="og:locale:alternate" content={`${l}_PK`} />
          ))}
          <meta
            property="og:image"
            content={`${BASE_URL}/portfolio-image.png`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Shakeel Haider - Full-Stack & React Native Developer" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Shakeel Haider | Full-Stack & React Native Developer" />
          <meta
            name="twitter:description"
            content="Explore the portfolio of Shakeel Haider, a skilled full-stack developer specializing in React, React Native, NestJS, TypeScript, and Python. Crafting high-performance web and mobile applications with clean code and modern technologies. Let's build something amazing together!"
          />
          <meta
            name="twitter:image"
            content={`${BASE_URL}/portfolio-image.png`}
          />
          <meta name="twitter:image:alt" content="Shakeel Haider Portfolio" />
          <meta name="twitter:url" content={url} />
          <meta name="twitter:site" content="@shakeelhaider" />
          <meta name="twitter:creator" content="@shakeelhaider" />

          {/* Indexing directive */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />

          <meta name="apple-mobile-web-app-title" content="Shakeel Haider" />
          <meta name="theme-color" content="#0d0d0d" />
          <meta name="author" content="Shakeel Haider" />
          <meta name="geo.region" content="PK-SD" />
          <meta name="geo.placename" content="Karachi, Pakistan" />

          {/* For Bing search engine */}
          <meta
            name="msvalidate.01"
            content="07B20D201CA84FDD3652BA3812A08DDF"
          />

          {/* Preload LCP image for improved Core Web Vitals */}
          <link
            rel="preload"
            as="image"
            href={`${BASE_URL}/portfolio-image.png`}
            fetchPriority="high"
          />

          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/android-chrome-512x512.png"
          />

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/site.webmanifest"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Outline&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Orbitron:wght@400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Riot&family=Questrial&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap"
            rel="stylesheet"
          />
          {/* Other Languages */}
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap"
            rel="stylesheet"
          />
          <Meta />
          <Links />
        </head>

        <body>
          <div className="blur-circle circle-1"></div>
          <div className="blur-circle circle-2"></div>
          <ThemeToggle />
          <SelectLanguage />
          <Loader />
          <Navbar locale={locale} />
          <main id="detail">
              <Outlet />
          </main>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  );
}

export default withSentry(App);

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();


  captureRemixErrorBoundaryError(error);

  const _goBack = () => {
    navigate(-1);
  };

  let status = 500;
  let message = "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || message;
    if (error.status === 404) {
      message = "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.";
    }
  }

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="error-body">
        <div className="noise"></div>
        <div className="overlay"></div>
        <div className="terminal">
          <h1>
            Error <span className="errorcode">{status}</span>
          </h1>
          <p className="output">{message}</p>
          <p className="output">
            Please try to{" "}
            <Link className="error-link" to="#" replace onClick={_goBack}>
              go back
            </Link>{" "}
            or{" "}
            <Link className="error-link" to="/" replace>
              return to the homepage
            </Link>
            .
          </p>
          <p className="output">Good luck.</p>
          <p className="underscore">&nbsp;</p>
        </div>
      </body>
    </html>
  );
}
