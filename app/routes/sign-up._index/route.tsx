import type { ActionFunctionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import { TypographyP } from '~/components/ui/Typography';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Link } from '@remix-run/react';
import SignUpForm, { SignUpFormFields } from '~/components/Auth/SignUpForm';
import { UserTableHandler } from '~/db/tables/user/handler';
import type { ActionResult } from '~/lib/types';
import type { z } from 'zod';

export default function LoginRoute() {
  return (
    <div className="m-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <TypographyP className="text-center">
            Already have an account?
            {' '}
            <Link to="/login" className="underline hover:opacity-50">Login</Link>
          </TypographyP>
        </CardFooter>
      </Card>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs):
Promise<TypedResponse<
  ActionResult<{ [SignUpFormFields.username]: string }, z.ZodIssue[]>
>> {
  const formData = await request.formData();
  console.log(formData.get('username'));
  const formFields = {
    [SignUpFormFields.username]: formData.get(SignUpFormFields.username),
    [SignUpFormFields.password]: formData.get(SignUpFormFields.password),
    [SignUpFormFields.repeatPassword]:
      formData.get(SignUpFormFields.repeatPassword),
  };
  if (formFields.password !== formFields.repeatPassword) {
    return json({ success: false,
      error: [
        { path: SignUpFormFields.repeatPassword,
          message: `Repeated password doesn't match` } as any as z.ZodIssue,
      ] });
  }
  const userTable = new UserTableHandler();
  const userCreateAction = await userTable.create(formFields);
  if (!userCreateAction.success) {
    return json({ success: false, error: userCreateAction.error.errors });
  }

  return json({ success: true,
    data: { [SignUpFormFields.username]: userCreateAction.data.username } });
}
