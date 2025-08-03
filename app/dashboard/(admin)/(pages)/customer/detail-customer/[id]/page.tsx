import React from "react";
import DetailCustomer from "./components/detail-customer";
import { headers } from "next/headers";

const Detail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const headerObj = await headers();

  const fetchClientDetail = async (): Promise<{
    data: GetClientList[];
    logs: {
      label: string;
      originalSizeKB: string;
      decryptedSizeKB: string;
      timeMs: string;
    }[];
  }> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: Object.fromEntries(headerObj),
      });

      if (response.status === 200) {
        const data = await response.json();
        return {
          data: data.data as GetClientList[],
          logs: data.logs ?? [],
        };
      } else {
        console.error(`Failed to fetch applicant details: ${response.statusText}`);
        return { data: [], logs: [] };
      }
    } catch (error) {
      console.error("Error fetching applicant details:", error);
      return { data: [], logs: [] };
    }
  };

  const applicantResponse = await fetchClientDetail();

  return <DetailCustomer dataApplicant={applicantResponse.data} decryptionLogs={applicantResponse.logs} />;
};

export default Detail;
