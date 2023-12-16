import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { TypographyP } from '~/components/ui/Typography';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { BookTableHandler } from '~/db/tables/book/handler';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { bookId } = params;
  if (!bookId) throw new Error('This route requires a bookId as param');
  const handler = new BookTableHandler();
  const bookData = await handler.getById(bookId);
  return json({ bookData });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) throw new Error('Book data is required for this route');
  return [
    { title: `${data.bookData.title} | Libra Catalog` },
    { name: 'description', content: `${data.bookData.description}\nRead more amazing books like this on Libra` },
  ];
};

export default function Catalog$BookIdRoute() {
  const { bookData } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const handleOpenChange = useCallback<
    NonNullable<React.ComponentProps<typeof Dialog>['onOpenChange']>
  >((isOpen) => {
    if (!isOpen) navigate('/catalog');
  }, [navigate]);

  const [isOpen, setIsOpen] = useState(false);
  useLayoutEffect(() => {
    setIsOpen(true);
  }, []);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {bookData.title}
            </DialogTitle>
            <DialogDescription>
              {bookData.publishDate}
            </DialogDescription>
          </DialogHeader>
          <div>
            <TypographyP>{bookData.description}</TypographyP>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
