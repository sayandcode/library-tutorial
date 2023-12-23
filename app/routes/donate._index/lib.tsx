import { useEffect } from 'react';
import type { FetcherWithComponents } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { ExternalLinkIcon } from 'lucide-react';
import { useToast } from '~/components/ui/use-toast';
import type { SerializeFrom } from '@remix-run/node';
import type { Donate_IndexActionType } from './route';

function useSuccessPath(fetcher:
FetcherWithComponents<SerializeFrom<Donate_IndexActionType>>,
) {
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
}

function getFormErrors<FormFieldName extends string>(
  formFieldsArr: FormFieldName[],
  fetcher: FetcherWithComponents<SerializeFrom<Donate_IndexActionType>>,
) {
  /* Error Handling */
  const entries = formFieldsArr.map(
    fieldName => [
      fieldName,
      null as string | null,
    ] as const,
  );
  const formErrors
    = Object.fromEntries(entries) as Record<FormFieldName, string | null>;

  if (fetcher.state !== 'submitting' && fetcher.data && !fetcher.data.success) {
    fetcher.data.error.forEach(({ path, message }) => {
      const erroredFieldName = path[0].toString();
      if (!getIsStringAFormField(erroredFieldName)) return;
      formErrors[erroredFieldName] = message;
    });
  }
  return formErrors;

  function getIsStringAFormField(str: string): str is FormFieldName {
    return formFieldsArr.includes(str as any);
  }
}

export default { useSuccessPath, getFormErrors };
