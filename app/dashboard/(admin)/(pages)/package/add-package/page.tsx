import React from "react";
import PackageAddForm from "./components/package-add-form";
import { headers } from "next/headers";

const PackageAdd = async () => {
  const handleSubmit = () => {};

  const headerObj = await headers();

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

  const data = await fetchBenefitsList();

  return (
    <div className="bg-white h-auto">
      <PackageAddForm dataBenefits={data} />
    </div>
  );
};

export default PackageAdd;