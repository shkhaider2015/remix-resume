import {
  Form,
  isRouteErrorResponse,
  json,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSubmit,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import { getContacts, createEmptyContact } from "./data";
import { useEffect } from "react";
import Navbar from "~/components/NavItem/Navbar";
import Loader from "./components/Loader/Loader";

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const contacts = await getContacts();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

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
        <meta property="og:title" content={"Shakeel Haider Resume"} />
        <meta property="og:site_name" content="shakeel haider" />
        <meta property="og:url" content="shakeel-haider.com" />
        <meta
          property="og:description"
          content="Software Developer Shakeel haider's portfolio/resume web development, mobile development"
        />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Protes Riot Fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Protest+Riot&display=swap"
          rel="stylesheet"
        /> */}
        {/* Questrial Fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Protest+Riot&family=Questrial&display=swap"
          rel="stylesheet"
        /> */}
        {/* Poppins Fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Riot&family=Questrial&display=swap"
          rel="stylesheet"
        /> */}
        {/* Bungee Outline Fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Outline&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Riot&family=Questrial&display=swap"
          rel="stylesheet"
        /> */}
        {/* Orbitron Fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Outline&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Orbitron:wght@400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Riot&family=Questrial&display=swap"
          rel="stylesheet"
        /> */}
        {/* Bungee Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Outline&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Orbitron:wght@400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Riot&family=Questrial&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Loader />
        <Navbar />
        <div id="detail">
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
