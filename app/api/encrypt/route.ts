import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Pastikan kunci memiliki panjang 32 byte
const encryptionKey = Buffer.from(process.env.KEY_SECRET!, "utf-8");

// Jika panjang kunci kurang dari 32 byte, tambahkan padding, jika lebih panjang potong menjadi 32 byte
const adjustedEncryptionKey =
  encryptionKey.length < 32
    ? Buffer.concat([encryptionKey, Buffer.alloc(32 - encryptionKey.length)]) // Padding
    : encryptionKey.slice(0, 32); // Potong jika lebih panjang

// Fungsi untuk mendekripsi data
const decryptData = (data: string): string => {
  try {
    const decipher = crypto.createDecipheriv("aes-256-ctr", adjustedEncryptionKey, Buffer.alloc(16, 0));
    let decrypted = decipher.update(data, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (err) {
    console.error("Decryption error:", err);
    return "Decryption failed";
  }
};

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    // Ambil data terenkripsi dari database
    const { data, error } = await supabase.rpc("get_encrypt").select("id, full_name, phone_number, address");

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ success: false, message: "Error fetching data from the database" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ success: false, message: "No encrypted data found" }, { status: 404 });
    }

    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return NextResponse.json(
        {
          success: false,
          message: "Data format is incorrect, expected an array",
        },
        { status: 500 }
      );
    }

    // Dekripsi data kecuali ID
    const decryptedData = data.map((item: any) => ({
      id: item.id, // ID tidak didekripsi
      full_name: decryptData(item.full_name),
      phone_number: decryptData(item.phone_number),
      address: decryptData(item.address),
    }));

    console.log("Decrypted data:", decryptedData);

    return NextResponse.json({ success: true, decryptedData }, { status: 200 });
  }

  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
