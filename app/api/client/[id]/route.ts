import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseStorage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// AES-256 Key dari ENV
const encryptionKey: Buffer = Buffer.from(process.env.KEY_SECRET!, "utf-8");

// Fungsi dekripsi teks
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

// Fungsi Ambil & Dekripsi Gambar dari Supabase Storage
const decryptFileFromStorage = async (filename: string): Promise<string | null> => {
  try {
    const { data, error } = await supabaseStorage.storage
      .from("folder") // Sesuaikan dengan nama bucket kamu
      .download(`document/${filename}`);

    if (error || !data) {
      console.error("Error downloading encrypted image:", error);
      return null;
    }

    const encryptedBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(encryptedBuffer);

    // Ambil IV (16 bytes pertama), sisanya adalah encrypted content
    const iv = buffer.subarray(0, 16);
    const content = buffer.subarray(16);

    const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
    const decrypted = Buffer.concat([decipher.update(content), decipher.final()]);

    // Ubah jadi Base64 untuk dikirim ke frontend
    return `data:image/png;base64,${decrypted.toString("base64")}`;
  } catch (err) {
    console.error("Failed to decrypt file:", err);
    return null;
  }
};

export const GET = auth(async (req, context) => {
  const { id } = (await context.params) ?? {};

  if (req.auth) {
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

    const decryptedData = await Promise.all(
      data.map(async (client: any) => {
        return {
          ...client,
          full_name: decryptText(client.full_name, encryptionKey),
          email: decryptText(client.email, encryptionKey),
          phone_number: decryptText(client.phone_number, encryptionKey),
          address: decryptText(client.address, encryptionKey),
          company_type: decryptText(client.company_type, encryptionKey),
          company_name: decryptText(client.company_name, encryptionKey),
          company_address: decryptText(client.company_address, encryptionKey),
          company_kbli: decryptText(client.company_kbli, encryptionKey),
          company_phone_number: decryptText(client.company_phone_number, encryptionKey),
          company_fax_number: decryptText(client.company_fax_number, encryptionKey),
          company_authorized_capital: decryptText(client.company_authorized_capital, encryptionKey),
          company_paid_up_capital: decryptText(client.company_paid_up_capital, encryptionKey),
          company_executives: decryptText(client.company_executives, encryptionKey),
          // Dekripsi gambar
          photo: await decryptFileFromStorage(client.photo),
          ktp: await decryptFileFromStorage(client.ktp),
          kk: await decryptFileFromStorage(client.kk),
          npwp: await decryptFileFromStorage(client.npwp),
        };
      })
    );

    console.log("RPC result => ", { data, error });

    return NextResponse.json({ success: true, data: decryptedData }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
