import { useFetcher } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { ActionFunctionArgs } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { TypographyH1, TypographyP } from '~/components/ui/Typography';

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

  return (
    <div className="m-8">
      <TypographyH1>Donate a book</TypographyH1>
      <TypographyP className="mb-2 lg:mb-4">
        Libra is a not-for-profit organization.
        Every book you donate adds to the knowledge of the community
      </TypographyP>
      <fetcher.Form method="POST" className="max-w-xl mx-auto flex flex-col gap-4">
        <div>
          <Label htmlFor={FormFields.title}>Book title</Label>
          <Input name={FormFields.title} id={FormFields.title} />
        </div>
        <div>
          <Label htmlFor={FormFields.publishDate}>Publish Date</Label>
          <Input name={FormFields.publishDate} id={FormFields.publishDate} type="date" />
        </div>
        <div>
          <Label htmlFor={FormFields.description}>Description</Label>
          <Input name={FormFields.description} id={FormFields.description} />
        </div>
        <Button className="mx-auto">Submit</Button>
      </fetcher.Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = {
    [FormFields.title]: formData.get(FormFields.title),
    [FormFields.publishDate]: formData.get(FormFields.publishDate),
    [FormFields.description]: formData.get(FormFields.description),
  };

  return json({ success: true as const, data });
}
