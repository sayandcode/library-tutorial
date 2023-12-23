import { Link } from '@remix-run/react';
import { Button, buttonVariants } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '~/components/ui/dialog';
import { cn } from '~/lib/utils';
import lib from './lib';

export default function NavbarLoginBtn(
  { className }:
  { className?: HTMLDivElement['className'] },
) {
  const [isOpen, handleOpenChange] = lib.useDialogOpenHandler();
  const isJsLoginButtonHidden = lib.useIsJsLoginButtonHidden();
  return (
    <div className={className}>
      <noscript>
        <Link to="/login" className={cn(buttonVariants({ variant: 'default' }), 'font-bold')}>Login</Link>
      </noscript>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div hidden={isJsLoginButtonHidden}><Button className="font-bold">Login</Button></div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Login/Sign-Up
            </DialogTitle>
            <DialogDescription>
              Create/Enter your account to use the app
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            TODO: Login form
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
