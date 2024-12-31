import React from "react";
import DetailPackage from "./components/detail-package";
import { headers } from "next/headers";

const DetailPage = async ({ params }: { params: { id: string } }) => {
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

  const data = await fetchPackageList();

  return (
    <>
      <div className="bg-white h-auto">
        <div className="p-6">
          <DetailPackage packageData={data} />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
