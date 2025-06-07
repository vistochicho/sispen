import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

const encryptionKey = Buffer.from(process.env.KEY_SECRET!, "utf-8");

// Fungsi untuk mengenkripsi data
const encryptData = (data: string): string => {
  const cipher = crypto.createCipheriv("aes-256-ctr", encryptionKey, Buffer.alloc(16, 0));
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const formData = await req.formData();

    // Convert formData to an object for easier handling
    const body = Object.fromEntries(formData.entries());

    // Pastikan nilai yang diambil dari formData dikonversi menjadi string
    const p_full_name = String(body.p_full_name);
    const p_phone_number = String(body.p_phone_number);
    const p_address = String(body.p_address);

    const encryptedFullName = encryptData(p_full_name);
    const encryptedPhoneNumber = encryptData(p_phone_number);
    const encryptedAddress = encryptData(p_address);

    const { data, error } = await supabase.rpc("insert_encrypt", {
      p_full_name: encryptedFullName,
      p_phone_number: encryptedPhoneNumber,
      p_address: encryptedAddress,
    });

    if (error) {
      console.error("Error calling insert_encrypt:", error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
