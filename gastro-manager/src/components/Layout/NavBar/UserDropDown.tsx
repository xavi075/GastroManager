import { NavBarItem } from "@/types/types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { USERDROPDOWN_LINKS } from "../../../../lib/constants/navigation";

export const UserDropDown = () => {
  return (
    <Menu as="div" className="relative inline-block">
      {/* Dropdown Toggle Button */}
      <Menu.Button className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
        <span>John</span>
        <svg
          className="hi-mini hi-chevron-down inline-block size-5 opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
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
          <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-gray-800 dark:ring-gray-700">

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
            className={`group flex items-center justify-between space-x-2 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium ${
              active
                ? "bg-blue-50 text-blue-800 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-800 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
            }`}
          >
            <FontAwesomeIcon 
              icon={item.icon} 
              className="hi-mini hi-chevron-down inline-block size-5 opacity-40" 
            />

            <span className="grow">{item.label}</span>
          </Link>
        )}
      </Menu.Item>
    </Menu.Item>
  );
}
