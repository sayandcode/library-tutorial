import { Label } from '~/components/ui/label';
import { Input, InputDescription } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { getTypedObjectFromEntries, useFormElIds } from '~/lib/utils';
import type { action } from '~/routes/sign-up._index/route';
import { useActionData } from '@remix-run/react';
import type { FormErrorRecord } from '~/lib/types';

export enum SignUpFormFields {
  username = 'username',
  password = 'password',
  repeatPassword = 'repeatPassword',
}
const formFieldsArr = Object.values(SignUpFormFields);

export default function SignUpForm() {
  const elIds = useFormElIds(formFieldsArr);
  const actionData = useActionData<typeof action>();
  const errMsgs: FormErrorRecord<SignUpFormFields>
    = getTypedObjectFromEntries(
      formFieldsArr
        .map(fieldName => ([fieldName, null] as [SignUpFormFields, null])),
    );
  if (!actionData?.success) {
    actionData?.error.validationData.forEach((err) => {
      const path = err.path[0];
      if (getIsStringAFormField(path)) errMsgs[path] = err.message;
    });
  }

  function getIsStringAFormField(str: string | number):
    str is SignUpFormFields {
    return formFieldsArr.includes(str as any);
  }

  const defaultValues = getTypedObjectFromEntries(formFieldsArr.map(
    fieldName =>
      [
        fieldName,
        actionData
          ? !actionData.success
              ? actionData.error.formData[fieldName]
              : ''
          : '',
      ],
  ));
  return (
    <form method="POST" action="/sign-up" className="flex flex-col gap-y-2">
      <div>
        <Label htmlFor={elIds[SignUpFormFields.username].main}>Username</Label>
        <Input
          id={elIds[SignUpFormFields.username].main}
          name={SignUpFormFields.username}
          defaultValue={defaultValues[SignUpFormFields.username]}
          aria-describedby={elIds[SignUpFormFields.username].description}
          error={!!errMsgs[SignUpFormFields.username]}
        />
        <InputDescription
          id={elIds[SignUpFormFields.username].description}
          error={!!errMsgs[SignUpFormFields.username]}
        >
          {errMsgs[SignUpFormFields.username]}
        </InputDescription>
      </div>
      <div>
        <Label htmlFor={elIds[SignUpFormFields.password].main}>Password</Label>
        <Input
          id={elIds[SignUpFormFields.password].main}
          name={SignUpFormFields.password}
          type="password"
          defaultValue={defaultValues[SignUpFormFields.password]}
          aria-describedby={elIds[SignUpFormFields.password].description}
          error={!!errMsgs[SignUpFormFields.password]}
        />
        <InputDescription
          id={elIds[SignUpFormFields.password].description}
          error={!!errMsgs[SignUpFormFields.password]}
        >
          {errMsgs[SignUpFormFields.password]}
        </InputDescription>
      </div>
      <div>
        <Label htmlFor={elIds[SignUpFormFields.repeatPassword].main}>
          Repeat Password
        </Label>
        <Input
          id={elIds[SignUpFormFields.repeatPassword].main}
          name={SignUpFormFields.repeatPassword}
          type="password"
          defaultValue={defaultValues[SignUpFormFields.repeatPassword]}
          aria-describedby={elIds[SignUpFormFields.repeatPassword].description}
          error={!!errMsgs[SignUpFormFields.repeatPassword]}
        />
        <InputDescription
          id={elIds[SignUpFormFields.repeatPassword].description}
          error={!!errMsgs[SignUpFormFields.repeatPassword]}
        >
          {errMsgs[SignUpFormFields.repeatPassword]}
        </InputDescription>
      </div>
      <Button className="mt-2 mx-auto block">Submit</Button>
    </form>
  );
}
