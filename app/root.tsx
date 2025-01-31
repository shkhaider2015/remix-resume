import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import Navbar from "~/components/NavItem/Navbar";
import Loader from "./components/Loader/Loader";
import Cursor from "./components/Cursor/Cursor";
import { BASE_URL } from "./assets/constants";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
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
        <meta property="og:image" content={`${BASE_URL}/portfolio-image.png`} />
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
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="error-container">
          {isRouteErrorResponse(error) ? (
            <div>
              <h1>{error.status}</h1>
              <h3>{error.statusText}</h3>
            </div>
          ) : error instanceof Error ? (
            <h1>{error.message}</h1>
          ) : (
            <h1>Unknown Error</h1>
          )}
        </main>
        <Scripts />
      </body>
    </html>
  );
}
