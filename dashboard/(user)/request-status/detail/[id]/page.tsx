import React from "react";
import { headers } from "next/headers";
import DetailRequest from "./components/request-detail";

const DetailPage = async () => {
  const headerObj = await headers();

  const fetchDetailRequest = async (): Promise<GetClientDet[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice-user`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // Map dates into Date objects
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

  const data = await fetchDetailRequest();

  console.log("status request api", data);

  return (
    <div>
      <DetailRequest />
    </div>
  );
};

export default DetailPage;
