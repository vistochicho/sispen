import React from "react";
import DetailCustomer from "./components/detail-customer";
import { headers } from "next/headers";

const Detail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const headerObj = await headers();

  const fetchClientList = async (): Promise<GetClientList[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: Object.fromEntries(headerObj),
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.data as GetClientList[];
      } else {
        console.error(`Failed to fetch applicant details: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching applicant details:", error);
      return [];
    }
  };

  const dataApplicant = await fetchClientList();

  console.log("dataApplicant", dataApplicant);

  return <DetailCustomer dataApplicant={dataApplicant} />;
};

export default Detail;
