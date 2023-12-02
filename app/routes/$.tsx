import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';

export const meta: MetaFunction = ({ location }) => {
  return [
    { title: 'Invalid Route' },
    { name: 'description', content: `${location.pathname} is not a valid route` },
  ];
};

export const loader = ({ params }: LoaderFunctionArgs) => {
  const path = params['*'];
  if (!path) throw new Error('Something went wrong');
  return json({ path }, { status: 404 });
};

export default function NotFound404() {
  const { path } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TypographyH1 className="text-center px-2">Error 404</TypographyH1>
      <TypographyP className="mx-4 text-center">
        {`/${path} `}
        route doesn't exist
      </TypographyP>
    </div>
  );
}
