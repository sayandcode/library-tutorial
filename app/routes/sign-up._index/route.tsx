import type { ActionFunctionArgs } from '@remix-run/node';
import { TypographyP } from '~/components/ui/Typography';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Link } from '@remix-run/react';
import SignUpForm from '~/components/Auth/SignUpForm';

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
