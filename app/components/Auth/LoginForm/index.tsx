import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useFormElIds } from '~/lib/utils';

enum FormFields {
  username = 'username',
  password = 'password',
}
const formFieldsArr = Object.values(FormFields);

export default function LoginForm() {
  const elIds = useFormElIds(formFieldsArr);
  return (
    <form method="POST" action="/login" className="flex flex-col gap-y-2">
      <div>
        <Label htmlFor={elIds[FormFields.username].main}>Username</Label>
        <Input id={elIds[FormFields.username].main} />
      </div>
      <div>
        <Label htmlFor={elIds[FormFields.password].main}>Password</Label>
        <Input id={elIds[FormFields.password].main} type="password" />
      </div>
      <Button className="mt-2 mx-auto block">Submit</Button>
    </form>
  );
}
