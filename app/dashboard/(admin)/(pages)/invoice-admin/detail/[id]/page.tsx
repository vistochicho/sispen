import React from "react";
import InvoiceDetail from "./components/invoice-detail";
import { headers } from "next/headers";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params; // Extract the dynamic `id` from params
  const headerObj = await headers();

  // Function to fetch invoice details using the 'id'
  const fetchInvoiceDetails = async (id: string): Promise<GetInvUserDet[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice-user/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.data as GetInvUserDet[]; // Return the invoice details data
      } else {
        console.error(`Failed to fetch invoice details: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      return [];
    }
  };

  // If 'id' is available, fetch the invoice details
  if (id) {
    const data = await fetchInvoiceDetails(id as string);

    return (
      <div className="h-auto">
        <InvoiceDetail invoiceData={data} /> {/* Pass fetched invoice details */}
      </div>
    );
  }

  return (
    <div>
      <p>Loading...</p> {/* Or you can handle the case where 'id' is not yet available */}
    </div>
  );
};

export default DetailPage;
