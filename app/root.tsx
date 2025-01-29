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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta property="og:title" content={"Shakeel Haider's Portfolio"} />
        <meta property="og:site_name" content="shakeel haider Portfolio" />
        <meta
          property="og:url"
          content="https://shakeel-haider-portfolio.netlify.app/"
        />
        <meta
          property="og:description"
          content="Explore the portfolio of Shakeel Haider, a skilled full-stack developer specializing in React, React Native, NestJS, TypeScript, and Python. Crafting high-performance web and mobile applications with clean code and modern technologies. Let's build something amazing together!"
        />
        <meta property="og:type" content="Portfolio" />
        <meta
          property="og:image"
          content="https://shakeel-haider-portfolio.netlify.app/portfolio-image.png"
        />
        <meta name="twitter:card" content="App" />
        <meta name="twitter:title" content="Shakeel Haider's Portfolio" />
        <meta
          name="twitter:description"
          content="Explore the portfolio of Shakeel Haider, a skilled full-stack developer specializing in React, React Native, NestJS, TypeScript, and Python. Crafting high-performance web and mobile applications with clean code and modern technologies. Let's build something amazing together!"
        />
        <meta
          name="twitter:image"
          content="https://shakeel-haider-portfolio.netlify.app/portfolio-image.png"
        />
        <meta
          name="twitter:url"
          content="https://shakeel-haider-portfolio.netlify.app/"
        />
        <meta name="twitter:site" content="Portfolio" />
        <meta name="twitter:creator" content="Shakeel Haider" />
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
