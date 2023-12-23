import { Link } from '@remix-run/react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Button, buttonVariants } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '~/components/ui/dialog';
import { cn } from '~/lib/utils';

export default function NavbarLoginBtn(
  { className }:
  { className?: HTMLDivElement['className'] },
) {
  const [isOpen, handleOpenChange] = useDialogOpenHandler();
  const isJsLoginButtonHidden = useIsJsLoginButtonHidden();
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

function useIsJsLoginButtonHidden() {
  const [isHidden, setIsHidden] = useState(true);
  useLayoutEffect(() => {
    setIsHidden(false);
  }, []);

  return isHidden;
}

function useDialogOpenHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = useCallback((newIsOpen: boolean) => {
    // setup close via interaction with modal
    if (!newIsOpen) {
      window.history.back(); // this automatically closes the modal
      return;
    }
    setIsOpen(true);
    window.history.pushState({}, '', '/login');

    // setup close via browser back button
    window.addEventListener('popstate', () => {
      if (window.location.pathname !== '/login') {
        setIsOpen(false);
      }
    }, { once: true });
  }, []);

  return [isOpen, handleOpenChange] as const;
}
