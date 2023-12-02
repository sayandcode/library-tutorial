import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import twStylesheet from './tailwind.css';
import fontsourceRedhatMonoStylesheet from '@fontsource-variable/red-hat-mono/wght.css';
import { TypographyH1, TypographyP } from './components/ui/Typography';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: twStylesheet },
  { rel: 'stylesheet', href: fontsourceRedhatMonoStylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-mono">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <title>Server Error</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-mono">
        <div className="flex flex-col justify-center items-center h-screen">
          <TypographyH1 className="text-5xl">Oops! This one's on us</TypographyH1>
          <TypographyP className="mx-4 text-center">
            Error 500: Something went wrong internally. Please try again later
          </TypographyP>
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
