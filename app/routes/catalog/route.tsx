import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link, Form, useSubmit, Outlet } from '@remix-run/react';
import { SearchIcon } from 'lucide-react';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import { BookTableHandler } from '~/db/tables/book/handler';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const titleQuery = new URL(request.url).searchParams.get('title');
  const handler = new BookTableHandler();
  const booksList = await handler.getAll({
    ...(titleQuery && { title: titleQuery }),
  });
  return json({ booksList, titleQuery });
};

export default function CatalogRoute() {
  const { booksList, titleQuery } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  return (
    <div className="m-8">
      <TypographyH1>Book Catalog</TypographyH1>
      <TypographyP className="text-gray-600">
        Start your reading journey with us.
        We offer a wide variety of genres and authors.
      </TypographyP>
      <Form
        method="GET"
        action="/catalog"
        className="mt-4 mx-auto lg:max-w-screen-xl"
        onChange={(event) => {
          const isFirstQuery = titleQuery === null;
          submit(event.currentTarget, { replace: !isFirstQuery });
        }}
      >
        <div className="relative">
          <Input name="title" className="pl-10" placeholder="Search for a book by title..." defaultValue={titleQuery ?? ''} />
          <SearchIcon className="absolute left-2 top-2 pointer-events-none" />
        </div>
      </Form>
      <ul className="mt-4">
        <ScrollArea className="h-screen max-h-96 lg:max-w-screen-xl mx-auto bg-gray-50 rounded">
          {booksList.map(book => (
            <li key={book.id}>
              <Link to={`/catalog/${book.id}`}className=" block bg-white shadow-lg m-4 lg:m-6 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-lg lg:text-xl">{book.title}</div>
                  <div className="text-gray-500 text-sm lg:text-md">
                    #
                    {book.id}
                  </div>
                </div>
                <div className="text-sm mt-1 line-clamp-3">{book.description}</div>
              </Link>
            </li>
          ))}
        </ScrollArea>
      </ul>
      <Outlet />
    </div>
  );
}
