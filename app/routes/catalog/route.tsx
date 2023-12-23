import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  useLoaderData, Link, Form, useSubmit, Outlet, useNavigation, useLocation,
} from '@remix-run/react';
import { LibraryBigIcon, Loader2Icon, SearchIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import { BookTableHandler } from '~/db/tables/book/handler';
import { sleep } from '~/lib/utils';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await sleep(800); // add artificial delay to emulate network
  const titleQuery = new URL(request.url).searchParams.get('title');
  const bookTable = new BookTableHandler();
  const booksList
    = await bookTable.getAll({ ...(titleQuery && { title: titleQuery }) });
  return json({ booksList, titleQuery });
};

export default function CatalogRoute() {
  const { booksList, titleQuery } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const location = useLocation();
  const isSearchingForQuery
    = navigation.state === 'loading'
      && navigation.location.pathname === location.pathname;

  // reset the searchbox in case user soft navigates
  // to same page (can be done via navbar)
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (titleQuery === null && titleRef.current) titleRef.current.value = '';
  }, [titleQuery]);
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
          <Input ref={titleRef} name="title" className="pl-10" placeholder="Search for a book by title..." defaultValue={titleQuery ?? ''} />
          <SearchIcon aria-hidden className="absolute left-2 top-2 pointer-events-none" />
        </div>
      </Form>
      <ul className="mt-4 ">
        <ScrollArea className="relative h-screen max-h-96 lg:max-w-screen-xl mx-auto bg-gray-50 rounded">
          {isSearchingForQuery
            ? <div className="bg-gray-400/40 w-full h-full absolute z-10 flex items-center justify-center text-white"><Loader2Icon aria-label="Loading Icon" className="h-10 w-10 animate-spin " /></div>
            : null}
          {booksList.map(book => (
            <li key={book.id}>
              <Link to={`/catalog/${book.id}`}className=" block bg-white shadow-lg m-4 lg:m-6 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-lg lg:text-xl">{book.title}</div>
                  <div title={book.id} className="text-gray-500 text-sm lg:text-md truncate max-w-[50px]">
                    #
                    {book.id}
                  </div>
                </div>
                <div className="text-sm mt-1 line-clamp-3">{book.description}</div>
              </Link>
            </li>
          ))}
          {booksList.length === 0
            ? (
              <div className="w-full h-full absolute flex justify-center items-center flex-col px-2">
                <LibraryBigIcon aria-hidden className="h-10 w-10" />
                <div className="mt-2 text-center"> No books found </div>
              </div>
              )
            : null}
        </ScrollArea>
      </ul>
      <Outlet />
    </div>
  );
}
