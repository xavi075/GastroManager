import { NavBarItem } from "@/types/types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { USERDROPDOWN_LINKS } from "../../../../lib/constants/navigation";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter(); // Obtenir l'objecte router de Next.js
  const { pathname } = router; // Obtenir la ruta actual
  const { data: session } = useSession(); // Obtenir la sessió de l'usuari

  return (
    <Menu as="div" className="relative inline-block">
      {/* Dropdown Toggle Button */}
      <Menu.Button
        className={`group flex items-center space-x-2 rounded-lg border px-3 py-2 text-m font-medium border-bronze-300
        ${pathname == '/profile'
            ? 'bg-bronze-100 text-bronze-950 font-extrabold'
            : 'text-bronze-900 hover:bg-bronze-100 hover:text-bronze-950'
          }`}
        onClick={toggleMenu}
      >
        <span>{session?.user.name.split(' ')[0]}</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`hi-mini hi-chevron-down inline-block size-5 transform transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
        />
      </Menu.Button>
      {/* END Dropdown Toggle Button */}

      {/* Dropdown */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg shadow-xl focus:outline-none dark:shadow-gray-900">
          <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black ring-opacity-5">
            {USERDROPDOWN_LINKS.map((item) => (
              <UserDropDownLink {...item} />
            ))}
          </div>
          <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black ring-opacity-5">
            <Menu.Item>
              <button
                onClick={() => signOut()}
                className="group flex items-center space-x-2 rounded-lg border px-3 py-2 text-m font-medium border-transparent text-bronze-900 hover:bg-bronze-100 hover:text-bronze-950 active:border-bronze-100"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="hi-mini hi-logout inline-block size-5 opacity-25 group-hover:opacity-100 text-bronze-800"
                />
                <span className="grow">Tanca sessió</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      {/* END Dropdown */}
    </Menu>
  );
};

function UserDropDownLink(item: NavBarItem) {
  return (
    <Menu.Item>
      <Link
        href={item.path}
        className={`group flex items-center space-x-2 rounded-lg border px-3 py-2 text-m font-medium border-transparent text-bronze-900 hover:bg-bronze-100 hover:text-bronze-950 active:border-bronze-100`}
      >
        <FontAwesomeIcon
          icon={item.icon}
          className="hi-mini hi-briefcase inline-block size-5 opacity-25 group-hover:opacity-100 text-bronze-800"
        />

        <span className="grow">{item.label}</span>
      </Link>
    </Menu.Item>
  );
}