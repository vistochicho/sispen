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

      if (response.ok) {
        const data = await response.json();

        // Periksa apakah response sukses dan mengandung decryptedData
        if (data.success && Array.isArray(data.decryptedData)) {
          return data.decryptedData as GetEncrypt[];
        } else {
          console.error("Invalid response format or missing decryptedData:", data);
          return [];
        }
      } else {
        console.error(`Failed to fetch encrypt data: ${response.statusText}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching encrypt data:", error);
      return [];
    }
  };

  const data = await fetchEncrypt();

  console.log("fetch final", data);

  return <TableEncrypt dataEncrypt={data} />;
};

export default Encrypt;
