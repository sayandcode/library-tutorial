import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';
import { ScrollArea } from '~/components/ui/scroll-area';
import { BookTableHandler } from '~/db/tables/book/handler';

export const meta: MetaFunction = () => {
  return [
    { title: 'Book Catalog' },
    { name: 'description', content: 'A list of all books' },
  ];
};
export const loader = async () => {
  const handler = new BookTableHandler();
  const booksList = await handler.getAll();
  return json({ booksList });
};

export default function CatalogRoute() {
  const { booksList } = useLoaderData<typeof loader>();
  return (
    <div className="m-8">
      <TypographyH1>Book Catalog</TypographyH1>
      <TypographyP className="text-gray-600">
        Start your reading journey with us.
        We offer a wide variety of genres and authors.
      </TypographyP>
      <ul className="mt-4">
        <ScrollArea className="h-screen max-h-96 bg-gray-50 rounded">
          {booksList.map(book => (
            <li key={book.id}>
              <Link to={`/catalog/${book.id}`}className="block bg-white shadow-lg m-4 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-lg lg:text-xl">{book.title}</div>
                  <div className="text-gray-500 text-sm lg:text-md">
                    #
                    {book.id}
                  </div>
                </div>
                <div className="text-sm">{book.description}</div>
              </Link>
            </li>
          ))}
        </ScrollArea>
      </ul>
    </div>
  );
}
