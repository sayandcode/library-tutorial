import { useCallback, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '~/components/ui/dialog';

export default function NavbarLoginBtn(
  { className }:
  { className?: HTMLDivElement['className'] },
) {
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
  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="font-bold">Login</Button>
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
