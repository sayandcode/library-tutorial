import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { NavLink } from '@remix-run/react';
import { MenuIcon } from 'lucide-react';
import { Separator } from '~/components/ui/separator';

export default function Navbar() {
  return (
    <nav className="sticky top-0">
      <div className="p-4 shadow-md flex justify-center items-center relative">
        <NavLink to="/" className="font-bold text-2xl order-2 mx-auto">Libra</NavLink>
        <div className="order-1">
          <Collapsible className="">
            <CollapsibleTrigger className="flex items-center">
              <MenuIcon />
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute bottom-0 left-0 translate-y-full w-full shadow-md">
              <ul className="bg-white w-full">
                <li>
                  <NavLink to="/catalog" className="p-2 block text-center hover:bg-gray-100 focus-visible:bg-gray-100 outline-none focus-visible:underline aria-[current='page']:bg-gray-700 aria-[current='page']:text-white aria-[current='page']:font-bold">
                    Catalog
                  </NavLink>
                </li>
                <Separator className="mx-auto w-11/12" />
                <li>
                  <NavLink to="/donate" className="p-2 block text-center hover:bg-gray-100 focus-visible:bg-gray-100 outline-none focus-visible:underline aria-[current='page']:bg-gray-700 aria-[current='page']:text-white aria-[current='page']:font-bold">
                    Donate
                  </NavLink>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="px-4 order-3" />
      </div>
    </nav>
  );
}
