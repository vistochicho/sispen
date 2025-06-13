import React from "react";
import TableRequestStatus from "./components/table-request-status";
import { headers } from "next/headers";

const RequestStatus = async () => {
  const headerObj = await headers();

  const fetchStatusRequest = async (): Promise<GetStatusRequest[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`, {
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

  const data = await fetchStatusRequest();
  console.log(data);

  return (
    <div className="p-6">
      <TableRequestStatus dataStatReq={data} />
    </div>
  );
};

export default RequestStatus;
