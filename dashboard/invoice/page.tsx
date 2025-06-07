import { auth } from "@/auth";
import React from "react";
import { headers } from "next/headers";
import InvoiceUser from "./components/invoice-user";
import InvoiceAdmin from "./components/invoice-admin";

const Invoice = async () => {
  const headerObj = await headers();

  const fetchInvoiceUser = async (): Promise<GetInvoiceUser[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice-user`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // Map dates into Date objects
        return data.data.map((item: any) => ({
          ...item,
          start_date: new Date(item.start_date),
          end_date: new Date(item.end_date),
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

  const data = await fetchInvoiceUser();

  const session = await auth();
  return (
    <div>
      <div className="p-6">{session?.user.role === "users" ? <InvoiceUser invUserData={data} /> : <InvoiceAdmin invUserData={data} />}</div>
    </div>
  );
};

export default Invoice;
