import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useFormElIds } from '~/lib/utils';
import type { action } from '~/routes/sign-up._index/route';
import { useActionData } from '@remix-run/react';

export enum SignUpFormFields {
  username = 'username',
  password = 'password',
  repeatPassword = 'repeatPassword',
}
const formFieldsArr = Object.values(SignUpFormFields);

export default function SignUpForm() {
  const elIds = useFormElIds(formFieldsArr);
  const actionData = useActionData<typeof action>();
  console.log({ actionData });
  return (
    <form method="POST" action="/sign-up" className="flex flex-col gap-y-2">
      <div>
        <Label htmlFor={elIds[SignUpFormFields.username].main}>Username</Label>
        <Input id={elIds[SignUpFormFields.username].main} name={SignUpFormFields.username} defaultValue="sayandcode" />
      </div>
      <div>
        <Label htmlFor={elIds[SignUpFormFields.password].main}>Password</Label>
        <Input id={elIds[SignUpFormFields.password].main} name={SignUpFormFields.password} type="password" defaultValue="mypassword" />
      </div>
      <div>
        <Label htmlFor={elIds[SignUpFormFields.repeatPassword].main}>
          Repeat Password
        </Label>
        <Input id={elIds[SignUpFormFields.repeatPassword].main} name={SignUpFormFields.repeatPassword} type="password" defaultValue="mywrongpassword" />
      </div>
      <Button className="mt-2 mx-auto block">Submit</Button>
    </form>
  );
}
