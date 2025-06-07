import React from "react";
import TableNeedReview from "./components/table-need-review";
import { headers } from "next/headers";

const NeedReview = async () => {
  const headerObj = await headers();

  const fetchClientList = async (): Promise<GetClientList[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // Map dates into Date objects
        return data.data as GetClientList[];
      } else {
        console.error(`Failed to fetch menu items: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  };

  const data = await fetchClientList();
  return (
    <main className="bg-white h-auto">
      <div className="p-6">
        <TableNeedReview dataClient={data} />
      </div>
    </main>
  );
};

export default NeedReview;
