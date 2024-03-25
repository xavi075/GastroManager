import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from 'next/link'
import { UserDropDown } from "./UserDropDown";
import { NAVBAR_LINKS } from "../../../../lib/constants/navigation";
import { useRouter } from "next/router";
import { NavBarItem } from "../../../types/types"; // Ajusta la ruta según la ubicación real del archivo types

export const NavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      id="header"
      className="z-1 flex flex-none items-center bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-7xl">
        <div className="flex justify-between py-4">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Logo */}
            <a
              href="#"
              className="group inline-flex items-center space-x-2 text-3xl font-bold tracking-wide text-gray-900 hover:text-gray-600"
            >
              <img 
                src="/images/logo.png" 
                alt="logo"
                className="w-16"  
              />
              <h1 className="text-bronze-900 hidden md:block">GastroManager</h1>
            </a>
            {/* END Logo */}
          </div>
          {/* END Left Section */}

          {/* Right Section */}
          <div className="flex items-center space-x-2 lg:space-x-5">
            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-2 lg:flex">

              {NAVBAR_LINKS.map((item) => (
                <NavBarLink {...item} />
              ))}

            </nav>
            {/* END Desktop Navigation */}

            <UserDropDown></UserDropDown>

            {/* Toggle Mobile Navigation */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                type="button"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-bronze-200 bg-white px-3 py-2 text-sm font-semibold leading-5 hover:border-bronze-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:border-bronze-300 focus:ring-opacity-25 active:border-bronze-500 active:shadow-none"
              >
                <FontAwesomeIcon 
                  icon={faBars} 
                  className={`hi-solid hi-menu inline-block size-5 text-bronze-900`}
                />
              </button>
            </div>
            {/* END Toggle Mobile Navigation */}
          </div>
          {/* END Right Section */}
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}>
          <nav className="flex flex-col space-y-2 border-t py-4">
            
            {NAVBAR_LINKS.map((item) => (
              <NavBarLink {...item} />
            ))}

          </nav>
        </div>
        {/* END Mobile Navigation */}
      </div>
    </div>
  );
};

function NavBarLink( item : NavBarItem) {
  const router = useRouter(); // Obtener el objeto router de Next.js
  const { pathname } = router; // Obtener la ruta actual

  return (
    <Link 
      href={item.path} 
      className={`group flex items-center space-x-2 rounded-lg border px-3 py-2 text-m font-medium 
        ${pathname === item.path 
          ? 'border-bronze-200 bg-bronze-100 text-bronze-950 font-extrabold' 
          : 'border-transparent text-bronze-900 hover:bg-bronze-50 hover:text-bronze-950 active:border-bronze-100'
      }`}
    >
      <FontAwesomeIcon 
        icon={item.icon} 
        className={`hi-mini hi-briefcase inline-block size-5 opacity-25  group-hover:opacity-100
          ${pathname === item.path 
            ? 'text-bronze-900'
            : 'text-bronze-800'
        }`}
      />
      <span>{item.label}</span>
    </Link>
  );
}
