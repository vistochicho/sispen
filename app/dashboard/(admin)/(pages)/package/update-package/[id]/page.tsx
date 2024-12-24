import React from "react";
import UpdatePackage from "./components/update-package";
import { headers } from "next/headers";

const UpdatePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const headerObj = await headers();

  const fetchPackageList = async (): Promise<GetPackageList[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/package/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: Object.fromEntries(headerObj),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data.data as GetPackageList[]; // Expecting a single package object
      } else {
        console.error(`Failed to fetch package details: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
      return [];
    }
  };

  const dataPackage = await fetchPackageList();

  const fetchBenefitsList = async (): Promise<GetBenefitsList[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/benefits`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // Map dates into Date objects
        return data.data.map((item: any) => ({
          ...item,
        }));
      } else {
        console.error(`Failed to fetch menu items: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  };

  const dataBenefits = await fetchBenefitsList();

  return (
    <>
      <div className="bg-white h-auto">
        <div className="p-6">
          <UpdatePackage dataPackage={dataPackage} dataBenefits={dataBenefits} />
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
