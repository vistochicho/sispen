import React from "react";
import DetailRequest from "./components/request-detail";
import { headers } from "next/headers";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const headerObj = await headers();

  const fetchClientList = async (): Promise<GetClientDet[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: Object.fromEntries(headerObj),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data.data as GetClientDet[]; // Expecting a single package object
      } else {
        console.error(`Failed to fetch package details: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
      return [];
    }
  };

  const data = await fetchClientList();

  return (
    <div className="p-6">
      <DetailRequest packageData={data} />
    </div>
  );
};

export default DetailPage;
