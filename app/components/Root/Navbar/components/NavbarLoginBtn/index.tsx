import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '~/components/ui/dialog';

export default function NavbarLoginBtn(
  { className }:
  { className?: HTMLDivElement['className'] },
) {
  return (
    <div className={className}>
      <Dialog>
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
