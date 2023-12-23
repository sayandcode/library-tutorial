import { useFetcher, Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { ActionFunctionArgs } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';
import { BookTableHandler } from '~/db/tables/book/handler';
import type { ActionResult } from '~/lib/types/ActionResult';
import type { z } from 'zod';
import { useEffect, useId } from 'react';
import { cn, sleep } from '~/lib/utils';
import { ExternalLinkIcon, LoaderIcon } from 'lucide-react';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/components/ui/use-toast';

enum FormFields {
  title = 'title',
  publishDate = 'publishDate',
  description = 'description',
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Donate | Libra' },
    { name: 'description', content: 'Every book you donate adds to the knowledge of the community' },
  ];
};

export default function DonateIndexRoute() {
  const fetcher = useFetcher<typeof action>();
  /* Success Handling */
  const { toast } = useToast();
  useEffect(() => {
    if (fetcher.state !== 'submitting' && fetcher.data?.success) {
      const { title, id } = fetcher.data.data;
      toast({
        title: 'Added book to catalog',
        description: (
          <div>
            Thank you for donating
            {' '}
            <Link to={`/catalog/${id}`} className="hover:opacity-50 inline-flex gap-x-1 items-center">
              {title}
              <ExternalLinkIcon aria-hidden className="h-3 w-3" />
            </Link>
          </div>
        ),
        variant: 'success',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, fetcher.state, fetcher.data?.success]);

  /* Error Handling */
  const formErrors: Record<FormFields, string | null> = {
    [FormFields.title]: null,
    [FormFields.publishDate]: null,
    [FormFields.description]: null,
  };

  if (fetcher.state !== 'submitting' && fetcher.data && !fetcher.data.success) {
    fetcher.data.error.forEach(({ path, message }) => {
      const erroredFieldName = path[0].toString();
      if (!getIsStringAFormField(erroredFieldName)) return;
      formErrors[erroredFieldName] = message;
    });
  }

  const errorMsgElIds: Record<FormFields, string> = {
    [FormFields.title]: useId(),
    [FormFields.publishDate]: useId(),
    [FormFields.description]: useId(),
  };

  return (
    <div className="m-8">
      <TypographyH1>Donate a book</TypographyH1>
      <TypographyP className="mb-2 lg:mb-4">
        Libra is a not-for-profit organization.
        Every book you donate adds to the knowledge of the community
      </TypographyP>
      <fetcher.Form method="POST">
        <fieldset
          className="max-w-xl mx-auto flex flex-col gap-4"
          disabled={fetcher.state === 'submitting'}
        >
          <div>
            <Label
              htmlFor={FormFields.title}
              error={!!formErrors[FormFields.title]}
            >
              Book title
            </Label>
            <Input
              name={FormFields.title}
              id={FormFields.title}
              aria-describedby={errorMsgElIds[FormFields.title]}
              error={!!formErrors[FormFields.title]}
            />
            <div
              className={cn('mt-2 mx-2 text-sm', !!formErrors[FormFields.publishDate] && 'text-rose-600')}
              id={errorMsgElIds[FormFields.title]}
            >
              {formErrors[FormFields.title]}
            </div>
          </div>
          <div>
            <Label
              htmlFor={FormFields.publishDate}
              error={!!formErrors[FormFields.publishDate]}
            >
              Publish Date
            </Label>
            <Input
              name={FormFields.publishDate}
              id={FormFields.publishDate}
              type="date"
              aria-describedby={errorMsgElIds[FormFields.publishDate]}
              error={!!formErrors[FormFields.publishDate]}
            />
            <div
              className={cn('mt-2 mx-2 text-sm', !!formErrors[FormFields.publishDate] && 'text-rose-600')}
              id={errorMsgElIds[FormFields.publishDate]}
            >
              {formErrors[FormFields.publishDate]}
            </div>
          </div>
          <div>
            <Label
              htmlFor={FormFields.description}
              error={!!formErrors[FormFields.description]}
            >
              Description
            </Label>
            <Textarea
              name={FormFields.description}
              id={FormFields.description}
              aria-describedby={errorMsgElIds[FormFields.description]}
              error={!!formErrors[FormFields.description]}
              defaultValue="Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."
            />
            <div
              className={cn('mt-2 mx-2 text-sm', !!formErrors[FormFields.description] && 'text-rose-600')}
              id={errorMsgElIds[FormFields.description]}
            >
              {formErrors[FormFields.description]}
            </div>
          </div>
          <Button className="mx-auto w-[10ch]">
            { fetcher.state === 'submitting' ? <LoaderIcon aria-label="Loading Icon" className="animate-spin duration-1000" /> : 'Submit' }
          </Button>
        </fieldset>
      </fetcher.Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await sleep(800); // add artificial delay to simulate network
  const formData = await request.formData();
  const inputFormData = {
    [FormFields.title]: formData.get(FormFields.title),
    [FormFields.publishDate]: formData.get(FormFields.publishDate),
    [FormFields.description]: formData.get(FormFields.description),
  };
  const bookTable = new BookTableHandler();
  const addActionResult = await bookTable.add(inputFormData);
  if (!addActionResult.success) {
    const error = addActionResult.error.errors;
    return {
      success: false,
      error,
    } satisfies ActionResult<unknown, z.ZodIssue[]>;
  }

  return json({ success: true as const, data: addActionResult.data });
}

function getIsStringAFormField(str: string): str is FormFields {
  return Object.values(FormFields).includes(str as any);
}
