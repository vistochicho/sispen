import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseStorage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// AES-256 Key dari ENV
const encryptionKey: Buffer = Buffer.from(process.env.KEY_SECRET!, "utf-8");

// Penampung logs
const decryptionLogs: any[] = [];

// Fungsi dekripsi teks dengan log
const decryptTextWithLog = (label: string, cipherText: string, key: Buffer): string => {
  if (!cipherText) return "";
  try {
    const [ivHex, encryptedHex] = cipherText.split(":");
    if (!ivHex || !encryptedHex) throw new Error("Invalid cipher text format");

    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");

    const start = process.hrtime();
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    const elapsed = process.hrtime(start);

    const timeMs = (elapsed[0] * 1e3 + elapsed[1] / 1e6).toFixed(3);

    decryptionLogs.push({
      label,
      originalSizeKB: (encryptedText.length / 1024).toFixed(3),
      decryptedSizeKB: (decrypted.length / 1024).toFixed(3),
      timeMs,
    });

    return decrypted.toString("utf-8");
  } catch (error) {
    console.error(`Failed to decrypt ${label}:`, error);
    return "[Decryption Failed]";
  }
};

// Fungsi dekripsi file dari Supabase Storage
const decryptFileFromStorage = async (filename: string, label: string): Promise<string | null> => {
  try {
    const downloadStart = process.hrtime();
    const { data, error } = await supabaseStorage.storage.from("folder").download(`document/${filename}`);
    const downloadEnd = process.hrtime(downloadStart);

    if (error || !data) {
      console.error("Error downloading encrypted image:", error);
      return null;
    }

    const encryptedBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(encryptedBuffer);

    const iv = buffer.subarray(0, 16);
    const content = buffer.subarray(16);

    const decryptStart = process.hrtime();
    const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
    const decrypted = Buffer.concat([decipher.update(content), decipher.final()]);
    const decryptEnd = process.hrtime(decryptStart);

    const timeMs = (decryptEnd[0] * 1e3 + decryptEnd[1] / 1e6).toFixed(3);

    decryptionLogs.push({
      label,
      originalSizeKB: (buffer.length / 1024).toFixed(3),
      decryptedSizeKB: (decrypted.length / 1024).toFixed(3),
      timeMs,
    });

    return `data:image/png;base64,${decrypted.toString("base64")}`;
  } catch (err) {
    console.error("Failed to decrypt file:", err);
    return null;
  }
};

// Handler utama GET
export const GET = auth(async (req, context) => {
  const { id } = (await context.params) ?? {};

  if (!req.auth) {
    return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
  }

  const roleId = req.auth.user.roleid;
  if (!roleId) {
    return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("get_client_by_id", {
    p_cli_id: id,
  });

  if (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }

  decryptionLogs.length = 0;

  const decryptedData = await Promise.all(
    data.map(async (client: any) => {
      return {
        ...client,
        full_name: decryptTextWithLog("Full Name", client.full_name, encryptionKey),
        email: decryptTextWithLog("Email", client.email, encryptionKey),
        phone_number: decryptTextWithLog("Phone Number", client.phone_number, encryptionKey),
        address: decryptTextWithLog("Address", client.address, encryptionKey),
        company_type: decryptTextWithLog("Company Type", client.company_type, encryptionKey),
        company_name: decryptTextWithLog("Company Name", client.company_name, encryptionKey),
        company_address: decryptTextWithLog("Company Address", client.company_address, encryptionKey),
        company_kbli: decryptTextWithLog("Company KBLI", client.company_kbli, encryptionKey),
        company_phone_number: decryptTextWithLog("Company Phone Number", client.company_phone_number, encryptionKey),
        company_fax_number: decryptTextWithLog("Company Fax Number", client.company_fax_number, encryptionKey),
        company_authorized_capital: decryptTextWithLog("Company Authorized Capital", client.company_authorized_capital, encryptionKey),
        company_paid_up_capital: decryptTextWithLog("Company Paid-up Capital", client.company_paid_up_capital, encryptionKey),
        company_executives: decryptTextWithLog("Company Executives", client.company_executives, encryptionKey),
        photo: await decryptFileFromStorage(client.photo, "Photo"),
        ktp: await decryptFileFromStorage(client.ktp, "KTP"),
        kk: await decryptFileFromStorage(client.kk, "KK"),
        npwp: await decryptFileFromStorage(client.npwp, "NPWP"),
      };
    })
  );

  return NextResponse.json({ success: true, data: decryptedData, logs: decryptionLogs }, { status: 200 });
});
