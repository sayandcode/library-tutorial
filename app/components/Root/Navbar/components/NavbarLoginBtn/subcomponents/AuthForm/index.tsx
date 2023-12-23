import LoginForm from '~/components/Auth/LoginForm';
import SignUpForm from '~/components/Auth/SignUpForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

enum TabOptions {
  login = 'login',
  signup = 'signup',
}

export default function NavbarLoginBtnAuthForm() {
  return (
    <Tabs defaultValue={TabOptions.login} className="">
      <TabsList>
        <TabsTrigger value={TabOptions.login}>Login</TabsTrigger>
        <TabsTrigger value={TabOptions.signup}>Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value={TabOptions.login}>
        <LoginForm />
      </TabsContent>
      <TabsContent value={TabOptions.signup}>
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
