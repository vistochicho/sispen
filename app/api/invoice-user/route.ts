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

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const { data, error } = await supabase.rpc("get_invoice");

    if (error) {
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }

    console.log("RPC result => ", { data, error });

    const decryptedData = data.map((client: any) => {
      try {
        const company_name = decryptText(client.company_name, encryptionKey);

        // Log perbandingan encrypted vs decrypted untuk tiap field
        console.log(`--- Decrypt invoice id=${client.id} ---`);
        console.log("company_name:", { encrypted: client.company_name, decrypted: company_name });

        return {
          ...client,
          company_name,
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
