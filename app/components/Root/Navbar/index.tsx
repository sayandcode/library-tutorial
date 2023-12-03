import { NavLink } from '@remix-run/react';
import SiteNavLinks from './components/SiteNavLinks';

export default function Navbar() {
  return (
    <nav className="sticky top-0">
      <div className="p-4 shadow-md flex justify-center items-center relative">
        <NavLink to="/" className="font-bold text-2xl order-2 lg:order-1 mx-auto lg:ml-0 lg:mr-auto">Libra</NavLink>
        <div className="order-1 lg:order-2">
          <SiteNavLinks />
        </div>
        <div className="px-4 order-3" />
      </div>
    </nav>
  );
}
