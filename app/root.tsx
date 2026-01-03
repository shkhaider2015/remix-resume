import {
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
import Cursor from "./components/Cursor/Cursor";
import { BASE_URL } from "./assets/constants";
import { useEffect } from "react";
import { ThemeProvider } from "./context/theme";
import { getThemeFromCookies } from "./utils/theme.server";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import { getLocaleFromUrl } from "./utils/functions/functions.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const theme = getThemeFromCookies(request);
  let locale = getLocaleFromUrl(request);
  
  return json({
    theme,
    ENV: {
      GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID
    },
    locale,
  });
};

export let handle = {
  i18n: "common",
};

export default function App() {
  const { theme, ENV, locale } = useLoaderData<typeof loader>();
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
          <meta property="og:title" content={"Shakeel Haider's Portfolio"} />
          <meta property="og:site_name" content="shakeel haider Portfolio" />
          <meta property="og:url" content={`${BASE_URL}/`} />
          <meta
            property="og:description"
            content="Explore the portfolio of Shakeel Haider, a skilled full-stack developer specializing in React, React Native, NestJS, TypeScript, and Python. Crafting high-performance web and mobile applications with clean code and modern technologies. Let's build something amazing together!"
          />
          <meta property="og:type" content="Portfolio" />
          <meta
            property="og:image"
            content={`${BASE_URL}/portfolio-image.png`}
          />
          <meta name="twitter:card" content="App" />
          <meta name="twitter:title" content="Shakeel Haider's Portfolio" />
          <meta
            name="twitter:description"
            content="Explore the portfolio of Shakeel Haider, a skilled full-stack developer specializing in React, React Native, NestJS, TypeScript, and Python. Crafting high-performance web and mobile applications with clean code and modern technologies. Let's build something amazing together!"
          />
          <meta
            name="twitter:image"
            content={`${BASE_URL}/portfolio-image.png`}
          />
          <meta name="twitter:url" content={`${BASE_URL}/`} />
          <meta name="twitter:site" content="Portfolio" />
          <meta name="twitter:creator" content="Shakeel Haider" />

          <meta name="apple-mobile-web-app-title" content="Shakeel Haider" />

          {/* For Bing search engine */}
          <meta
            name="msvalidate.01"
            content="07B20D201CA84FDD3652BA3812A08DDF"
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
          <Meta />
          <Links />
        </head>

        <body>
          <ThemeToggle />
          <Loader />
          <Navbar />
          <div id="detail">
            <Cursor />
              <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const _goBack = () => {
    navigate(-1);
  };
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
            Error <span className="errorcode">404</span>
          </h1>
          <p className="output">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <p className="output">
            Please try to <Link className="error-link" to="#" replace onClick={_goBack}>go back</Link> or{" "}
            <Link className="error-link" to="/" replace>return to the homepage</Link>.
          </p>
          <p className="output">Good luck.</p>
          <p className="underscore" >&nbsp;</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
