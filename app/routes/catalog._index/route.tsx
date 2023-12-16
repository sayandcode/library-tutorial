import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Book Catalog' },
    { name: 'description', content: 'A list of all books' },
  ];
};

export default function CatalogIndexRoute() {
  return null;
}
