import {
  Links,
  LiveReload,
  Meta,
  Scripts,
} from '@remix-run/react';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';

export function CustomRootErrorBoundary() {
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
          <TypographyH1 className="text-center px-2">Oops! This one's on us</TypographyH1>
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
