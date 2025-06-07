import React from "react";
import DashboardUser from "./components/dashboard/dashboard-user";
import DashboardAdmin from "./components/dashboard/dashboard-admin";
import { auth } from "@/auth";
import { GetShortUser } from "@/types/short-user";
import { headers } from "next/headers";

const Dashboard = async () => {
  const session = await auth();
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

  const userData = await fetchUser();
  return <div className="w-full bg-white p-6">{session?.user.role === "users" ? <DashboardUser userData={userData!} /> : <DashboardAdmin />}</div>;
};

export default Dashboard;
