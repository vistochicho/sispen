import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

const encryptionKey: Buffer = Buffer.from(process.env.KEY_SECRET!, "utf-8");

const decryptText = (cipherText: string, key: Buffer): string => {
  if (!cipherText) return "";
  try {
    const [ivHex, encryptedHex] = cipherText.split(":");
    if (!ivHex || !encryptedHex) throw new Error("Invalid cipher text format");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString("utf-8");
  } catch (error) {
    console.error("Decryption error:", error, "CipherText:", cipherText);
    return "[Decryption Failed]";
  }
};

export const GET = auth(async function GET(req, { params }) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const invoiceId = params?.id; // Get the dynamic 'id' from the URL

    const { data, error } = await supabase.rpc("get_invoice_details", {
      p_invoice_id: invoiceId, // Use the dynamic invoiceId here
    });

    if (error) {
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }

    const decryptedData = data.map((client: any) => {
      try {
        // Buat variabel decrypt hasil tiap field
        const full_name = decryptText(client.full_name, encryptionKey);
        const phone_number = decryptText(client.phone_number, encryptionKey);
        const address = decryptText(client.address, encryptionKey);
        const company_name = decryptText(client.company_name, encryptionKey);
        const company_address = decryptText(client.company_address, encryptionKey);
        const company_phone_number = decryptText(client.company_phone_number, encryptionKey);

        // Log perbandingan encrypted vs decrypted untuk tiap field
        // console.log(`--- Decrypt client id=${client.id} ---`);
        // console.log("full_name:", { encrypted: client.full_name, decrypted: full_name });
        // console.log("email:", { encrypted: client.email, decrypted: email });
        // console.log("phone_number:", { encrypted: client.phone_number, decrypted: phone_number });
        // console.log("address:", { encrypted: client.address, decrypted: address });
        // console.log("company_type:", { encrypted: client.company_type, decrypted: company_type });
        // console.log("company_name:", { encrypted: client.company_name, decrypted: company_name });
        // console.log("company_address:", { encrypted: client.company_address, decrypted: company_address });
        // console.log("company_kbli:", { encrypted: client.company_kbli, decrypted: company_kbli });
        // console.log("company_phone_number:", { encrypted: client.company_phone_number, decrypted: company_phone_number });
        // console.log("company_fax_number:", { encrypted: client.company_fax_number, decrypted: company_fax_number });
        // console.log("company_authorized_capital:", { encrypted: client.company_authorized_capital, decrypted: company_authorized_capital });
        // console.log("company_paid_up_capital:", { encrypted: client.company_paid_up_capital, decrypted: company_paid_up_capital });
        // console.log("company_executives:", { encrypted: client.company_executives, decrypted: company_executives });

        return {
          ...client,
          full_name,
          phone_number,
          address,
          company_name,
          company_address,
          company_phone_number,
        };
      } catch (err) {
        console.error(`Error decrypting client id=${client.id}`, err);
        return client;
      }
    });

    return NextResponse.json({ success: true, data: decryptedData }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
