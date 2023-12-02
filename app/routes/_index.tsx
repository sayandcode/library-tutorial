import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';

export const meta: MetaFunction = () => {
  return [
    { title: 'Libra' },
    { name: 'description', content: 'A library built in Remix' },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TypographyH1 className="text-5xl">Libra</TypographyH1>
      <TypographyP className="mx-4 text-center">A library management app built using Remix</TypographyP>
      <div className="flex gap-2 mt-2">
        <Link to="/catalog" className="underline">Catalog</Link>
        <Link to="/donate" className="underline">Donate</Link>
      </div>
    </div>
  );
}
