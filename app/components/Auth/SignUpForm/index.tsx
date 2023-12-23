import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { useId } from 'react';
import { Button } from '~/components/ui/button';

enum FormFields {
  username = 'username',
  password = 'password',
  repeatPassword = 'repeatPassword',
}

export default function SignUpForm() {
  const elIds = useElIds();
  return (
    <form method="POST" action="/sign-up" className="flex flex-col gap-y-2">
      <div>
        <Label htmlFor={elIds[FormFields.username].main}>Username</Label>
        <Input id={elIds[FormFields.username].main} />
      </div>
      <div>
        <Label htmlFor={elIds[FormFields.password].main}>Password</Label>
        <Input id={elIds[FormFields.password].main} type="password" />
      </div>
      <div>
        <Label htmlFor={elIds[FormFields.repeatPassword].main}>
          Repeat Password
        </Label>
        <Input id={elIds[FormFields.repeatPassword].main} type="password" />
      </div>
      <Button className="mt-2 mx-auto block">Submit</Button>
    </form>
  );
}

function useElIds() {
  const id = useId();
  return {
    [FormFields.username]: {
      main: `${id}-${FormFields.username}`,
    },
    [FormFields.password]: {
      main: `${id}-${FormFields.password}`,
    },
    [FormFields.repeatPassword]: {
      main: `${id}-${FormFields.repeatPassword}`,
    },
  };
}
