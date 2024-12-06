"use client";
import { GetMenuItem } from "@/types/menu-item";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  menuItems: GetMenuItem[];
}

export const Sidebar = ({ isSidebarOpen, menuItems }: SidebarProps) => {
  const pathname = usePathname();
  const [activePaths, setActivePaths] = useState<string[]>([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<string[]>([]);

  // Automatically open all menus containing active submenu
  useEffect(() => {
    const openItems = menuItems.filter((menuItem) => menuItem.subMenu).map((menuItem) => menuItem.id);

    setIsSubMenuOpen(openItems);
  }, [menuItems]);

  const toggleMenu = (id: string) => {
    setIsSubMenuOpen((prev) => (prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]));
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-4 py-4 overflow-y-auto lg:overflow-hidden lg:hover:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <ul className="space-y-4 font-medium text-black dark:text-white">
          {menuItems.map((menuItem) => (
            <li key={menuItem.id} className="py-2 ">
              <button className="flex items-center justify-between w-full focus:outline-none group" onClick={() => toggleMenu(menuItem.id)}>
                <div className="flex items-center gap-2 ">
                  <img src={menuItem.icon} className="w-5 h-5" alt={menuItem.name} />
                  {menuItem.subMenu && menuItem.subMenu.length > 0 ? (
                    <span className="text-custom-menu-gray font-semibold tracking-wide dark:text-white text-sm ">{menuItem.name} </span>
                  ) : (
                    <Link href={menuItem.path!} className="text-custom-menu-gray font-semibold tracking-wide dark:text-white text-sm">
                      {menuItem.name}
                    </Link>
                  )}
                </div>
                {menuItem.subMenu &&
                  !menuItem.path &&
                  (isSubMenuOpen.includes(menuItem.id) ? (
                    <ChevronUpIcon className="w-5 h-5bg-red-400  hover:text-custom-blue" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 hover:text-custom-blue" />
                  ))}
              </button>

              {isSubMenuOpen.includes(menuItem.id) && menuItem.subMenu && (
                <ul className="space-y-2 pl-7 text-[13px] ">
                  {menuItem.subMenu.map((subItem) => {
                    const isActive = activePaths.includes(subItem.path);

                    return (
                      <li
                        key={subItem.path}
                        className={`${
                          isActive ? "text-custom-blue font-bold" : "text-custom-submenu-gray"
                        } dark:text-gray-300 hover:text-custom-blue dark:hover:text-white mt-2`}
                      >
                        <Link href={subItem.path}>
                          <span className="block">{subItem.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
