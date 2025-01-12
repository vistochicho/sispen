"use client";
import { GetMenuItem } from "@/types/menu-item";
import React, { useState } from "react";
import { Header } from "../layout/header";
import { Sidebar } from "../layout/sidebar";
import { GetShortUser } from "@/types/short-user";

interface LayoutWrapperProps {
  children: React.ReactNode;
  menuItems: GetMenuItem[];
  userData: GetShortUser;
}

export default function LayoutWrapper({ children, menuItems, userData }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} userData={userData} />
      <Sidebar isSidebarOpen={isSidebarOpen} menuItems={menuItems} />
      {/* <main className="flex-grow py-20 lg:pl-60 sm:pl-64 bg-gray-100 h-screen"> */}
      {/* <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 h-auto pb-10">{children}</div> */}
      {/* </main> */}
      <div className=" bg-gray-100 min-h-screen w-full">
        <div className="py-20 lg:pl-72 sm:pl-64 px-8 h-full w-full">{children}</div>
      </div>
    </>
  );
}
