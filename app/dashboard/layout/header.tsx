import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GetShortUser } from "@/types/short-user";
import { signOut } from "next-auth/react";

interface HeaderProps {
  toggleSidebar: () => void;
  userData: GetShortUser;
}

export const Header = ({ toggleSidebar, userData }: HeaderProps) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              className="inline-flex items-center  p-2 text-sm  text-gray-500 rounded-lg sm:hidden  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <Link href="/dashboard" className="flex ms-2 md:me-24  gap-2" shallow={true} prefetch={false}>
              <Image alt="OfficeNow" src="/office-now.png" className="h-4 w-auto md:h-4" width={300} height={300} />
            </Link>
          </div>
          <div className="flex items-center gap-x-4 lg:gap-x-4">
            <button type="button" className="text-gray-400 hover:text-gray-500">
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            {/* Separator */}
            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10 lg:dark:bg-white" />
            <Menu as="div" className="relative">
              <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Image
                  src={userData.gender === "Male" ? "/placeholder-male.jpg" : "/placeholder-female.jpg"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full bg-gray-50 mr-4"
                  width={32}
                  height={32}
                />
                <span className="hidden lg:flex lg:items-center">
                  <p className="line-clamp-1 max-w-[100px] text-sm">
                    {userData?.first_name} {userData?.last_name}
                  </p>
                  <span aria-hidden="true" className="ml-4 text-sm font-medium leading-6 text-custom-gray-rgb2 dark:text-white"></span>
                  <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <button
                    // logic admin ke login admin, user ke login user
                    onClick={() => signOut({ redirectTo: "/login" })}
                    className="block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};
