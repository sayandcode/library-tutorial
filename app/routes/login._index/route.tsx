import type { ActionFunctionArgs } from '@remix-run/node';
import LoginForm from '~/components/Auth/LoginForm';
import { TypographyP } from '~/components/ui/Typography';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Link } from '@remix-run/react';

export async function action(args: ActionFunctionArgs) {
  // TODO: Handle login request
  console.log(args);
  return null;
}

export default function LoginRoute() {
  return (
    <div className="m-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <TypographyP className="text-center">
            Don't have an account?
            {' '}
            <Link to="/sign-up" className="underline hover:opacity-50">Sign Up</Link>
          </TypographyP>
        </CardFooter>
      </Card>
    </div>
  );
}
