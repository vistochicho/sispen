import React from "react";
import PackageListPage from "./components/package-list-page";
import { headers } from "next/headers";

const PackageList = async () => {
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
        // return response.data as GetPackageList[];
        return data.data as [];
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

  console.log(data);
  return (
    <div className="p-6">
      <PackageListPage dataPackage={data} />
    </div>
  );
};

export default PackageList;
