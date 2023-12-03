import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import twStylesheet from './tailwind.css';
import fontsourceRedhatMonoStylesheet from '@fontsource-variable/red-hat-mono/wght.css';
import { CustomRootErrorBoundary } from './components/Root/ErrorBoundary';
import Navbar from '~/components/Root/Navbar';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: twStylesheet },
  { rel: 'stylesheet', href: fontsourceRedhatMonoStylesheet },
];

export default function App() {
  const location = useLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-mono">
        {location.pathname === '/' ? null : <Navbar />}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary = CustomRootErrorBoundary;
