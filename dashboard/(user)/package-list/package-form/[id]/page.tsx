import React from "react";
import FormPackage from "./components/form";
import { headers } from "next/headers";

const PackageForm = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const headerObj = await headers();

  const fetchPackageList = async (): Promise<GetPackageList[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/package/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
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

  return (
    <div className="p-6">
      <FormPackage id={id} dataPackage={data} />
    </div>
  );
};

export default PackageForm;
