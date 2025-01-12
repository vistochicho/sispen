import React from "react";
import TablePackage from "./components/table-package";
import { headers } from "next/headers";

const Package = async () => {
  const headerObj = await headers();

  const fetchPackageList = async (): Promise<GetPackageList[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/package`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // Map dates into Date objects
        return data.data as GetPackageList[];
      } else {
        console.error(`Failed to fetch menu items: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  };

  const data = await fetchPackageList();

  return (
    <div className="bg-white h-auto">
      <div className="p-6">
        <TablePackage dataPackage={data} />
      </div>
    </div>
  );
};

export default Package;
