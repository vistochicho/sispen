import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Pastikan panjang key adalah 32 byte
const encryptionKey = Buffer.from(process.env.KEY_SECRET!, "utf-8");

// Fungsi untuk mendekripsi data
const decryptData = (encryptedData: string): string => {
  const { iv, data } = JSON.parse(encryptedData); // Parse JSON if stored as string
  const decipher = crypto.createDecipheriv("aes-256-ctr", encryptionKey, Buffer.from(iv, "hex"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(data, "hex")), decipher.final()]);
  return decrypted.toString("utf-8"); // Convert back to string
};

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    // Ambil data terenkripsi dari database
    const { data, error } = await supabase
      .rpc("get_encrypt")
      .select(
        "id, full_name, email, phone_number, address, company_name, company_address, company_type, company_phone_number, company_fax_number, company_authorized_capital, company_paid_up_capital, company_executives, company_kbli, kk, ktp, npwp, photo"
      );

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
      email: decryptData(item.email),
      phone_number: decryptData(item.phone_number),
      address: decryptData(item.address),
      company_name: decryptData(item.company_name),
      company_address: decryptData(item.company_address),
      company_type: decryptData(item.company_type),
      company_phone_number: decryptData(item.company_phone_number),
      company_fax_number: decryptData(item.company_fax_number),
      company_authorized_capital: decryptData(item.company_authorized_capital),
      company_paid_up_capital: decryptData(item.company_paid_up_capital),
      company_executives: decryptData(item.company_executives),
      company_kbli: decryptData(item.company_kbli),
    }));

    console.log("Decrypted data:", decryptedData);

    // Mengembalikan data yang sudah didekripsi
    return NextResponse.json({ success: true, data: decryptedData }, { status: 200 });
  }

  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
