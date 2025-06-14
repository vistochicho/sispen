import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

const encryptionKey: Buffer = Buffer.from(process.env.KEY_SECRET!, "utf-8");

const decryptText = (cipherText: string, key: Buffer): string => {
  if (!cipherText) return "";
  try {
    const [ivHex, encryptedHex] = cipherText.split(":");
    if (!ivHex || !encryptedHex) {
      throw new Error("Invalid cipherText format. Expected IV:Encrypted format.");
    }

    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString("utf-8");
  } catch (error) {
    console.error("Decryption failed for:", cipherText, "\nError:", error);
    return "[Decryption Failed]";
  }
};

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
  }

  const roleId = req.auth.user.roleid;
  if (!roleId) {
    return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("get_client");

  if (error) {
    console.error("Supabase RPC error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }

  const decryptedData = data.map((client: any) => {
    try {
      // Buat variabel decrypt hasil tiap field
      const full_name = decryptText(client.full_name, encryptionKey);
      const email = decryptText(client.email, encryptionKey);
      const phone_number = decryptText(client.phone_number, encryptionKey);
      const address = decryptText(client.address, encryptionKey);
      const company_type = decryptText(client.company_type, encryptionKey);
      const company_name = decryptText(client.company_name, encryptionKey);
      const company_address = decryptText(client.company_address, encryptionKey);
      const company_kbli = decryptText(client.company_kbli, encryptionKey);
      const company_phone_number = decryptText(client.company_phone_number, encryptionKey);
      const company_fax_number = client.company_fax_number ? decryptText(client.company_fax_number, encryptionKey) : null;
      const company_authorized_capital = decryptText(client.company_authorized_capital, encryptionKey);
      const company_paid_up_capital = decryptText(client.company_paid_up_capital, encryptionKey);
      const company_executives = decryptText(client.company_executives, encryptionKey);

      return {
        ...client,
        full_name,
        email,
        phone_number,
        address,
        company_type,
        company_name,
        company_address,
        company_kbli,
        company_phone_number,
        company_fax_number,
        company_authorized_capital,
        company_paid_up_capital,
        company_executives,
      };
    } catch (err) {
      console.error(`Error decrypting client id=${client.id}`, err);
      return client;
    }
  });

  return NextResponse.json({ success: true, data: decryptedData }, { status: 200 });
});
