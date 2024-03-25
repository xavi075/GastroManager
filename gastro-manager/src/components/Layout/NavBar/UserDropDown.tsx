import { NavBarItem } from "@/types/types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { USERDROPDOWN_LINKS } from "../../../../lib/constants/navigation";

export const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Menu as="div" className="relative inline-block">
      {/* Dropdown Toggle Button */}
      <Menu.Button 
        className="inline-flex items-center justify-center space-x-2 rounded-lg border border-blood_red-200 text-blood_red px-3 py-2 text-sm font-semibold leading-5 hover:text-blood_red-950 hover:font-extrabold hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none"
        onClick={toggleMenu}
      >
        <span>John</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`hi-mini hi-chevron-down inline-block size-5 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg shadow-xl focus:outline-none dark:shadow-gray-900">
          <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black ring-opacity-5">

            {USERDROPDOWN_LINKS.map((item) => (
              <UserDropDownLink {...item} />
            ))}

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
      <Menu.Item>
        {({ active }) => (
          <Link
            href={item.path}
            className={`group flex items-center justify-between space-x-2 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium text-blood_red-900 hover:text-blood_red-950 hover:font-extrabold`}
          >
            <FontAwesomeIcon 
              icon={item.icon} 
              className="hi-mini hi-chevron-down inline-block size-5 text-blood_red-900" 
            />

            <span className="grow">{item.label}</span>
          </Link>
        )}
      </Menu.Item>
    </Menu.Item>
  );
}
