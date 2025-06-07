import { GetMenuItem } from "@/types/menu-item";
import React from "react";
import LayoutWrapper from "./components/layout-wrapper";
import { headers } from "next/headers";
import { GetShortUser } from "@/types/short-user";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerObj = await headers();

  const fetchUser = async (): Promise<GetShortUser | null> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/short`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // return response.data as GetMenuItem[];
        return data.data[0] as GetShortUser;
      } else {
        console.error(`Failed to fetch menu items: ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return null;
    }
  };

  const fetchMenuItem = async (): Promise<GetMenuItem[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // return response.data as GetMenuItem[];
        return data.data as GetMenuItem[];
      } else {
        console.error(`Failed to fetch menu items: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  };

  const menuItems = await fetchMenuItem();
  const userData = await fetchUser();

  console.log("test user", userData);

  return (
    <LayoutWrapper menuItems={menuItems} userData={userData!}>
      {children}
    </LayoutWrapper>
  );
}
