import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { NavLink } from '@remix-run/react';
import { MenuIcon } from 'lucide-react';
import { Separator } from '~/components/ui/separator';
import { useCallback, useState } from 'react';

export default function SiteNavLinks() {
  return (
    <>
      <MobileLinks />
      <DesktopLinks />
    </>
  );
}

function DesktopLinks() {
  return (
    <ul className="hidden lg:flex gap-4">
      <li>
        <NavLink to="/catalog" className="outline-none focus-visible:underline hover:underline aria-[current='page']:font-bold">
          Catalog
        </NavLink>
      </li>
      <li>
        <NavLink to="/donate" className="outline-none focus-visible:underline hover:underline aria-[current='page']:font-bold">
          Donate
        </NavLink>
      </li>
    </ul>
  );
}

function MobileLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = useCallback(setIsOpen, [setIsOpen]);
  const handleNavLinkClick = useCallback(() => setIsOpen(false), [setIsOpen]);
  return (
    <Collapsible className="lg:hidden" open={isOpen} onOpenChange={handleOpenChange}>
      <CollapsibleTrigger className="flex items-center">
        <MenuIcon aria-label="Menu Icon" />
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute bottom-0 left-0 translate-y-full w-full shadow-md">
        <ul className="bg-white w-full">
          <li>
            <NavLink
              to="/catalog"
              className="p-2 block text-center hover:bg-gray-100 focus-visible:bg-gray-100 outline-none focus-visible:underline aria-[current='page']:bg-gray-700 aria-[current='page']:text-white aria-[current='page']:font-bold"
              onClick={handleNavLinkClick}
            >
              Catalog
            </NavLink>
          </li>
          <Separator className="mx-auto w-11/12" />
          <li>
            <NavLink
              to="/donate"
              className="p-2 block text-center hover:bg-gray-100 focus-visible:bg-gray-100 outline-none focus-visible:underline aria-[current='page']:bg-gray-700 aria-[current='page']:text-white aria-[current='page']:font-bold"
              onClick={handleNavLinkClick}
            >
              Donate
            </NavLink>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
