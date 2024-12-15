import React from "react";
import { headers } from "next/headers";
import TableEncrypt from "./components/table-encrypt";

const Encrypt = async () => {
  const headerObj = await headers();

  const fetchEncrypt = async (): Promise<GetEncrypt[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encrypt`, {
        method: "GET",
        cache: "no-store",
        headers: headerObj,
      });
      if (response.status === 200) {
        const data = await response.json();
        // Map dates into Date objects
        return data.data.map((item: any) => ({
          ...item,
          start_encrypt: new Date(item.start_encrypt),
          final_encrypt: new Date(item.final_encrypt),
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

  const data = await fetchEncrypt();

  return <TableEncrypt dataEncrypt={data} />;
};

export default Encrypt;
