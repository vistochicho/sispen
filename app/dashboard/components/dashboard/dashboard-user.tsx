import { GetShortUser } from "@/types/short-user";
import React from "react";

interface DashboardProps {
  userData: GetShortUser;
}

const DashboardUser = ({ userData }: DashboardProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-64">
      <h1 className="text-4xl font-medium mb-4">
        Hello, {userData.first_name} {userData.last_name}
      </h1>
      <p className="text-md text-zinc-400">
        Welcome! Ready to Introduce
        <br />
        Your Business to the World?
      </p>
    </div>
  );
};

export default DashboardUser;
