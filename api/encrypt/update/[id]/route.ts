import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

const encryptionKey = Buffer.from(process.env.KEY_SECRET!, "utf-8");

// Encrypt the given data using AES-256-CTR
const encryptData = (data: string): string => {
  const cipher = crypto.createCipheriv("aes-256-ctr", encryptionKey, Buffer.alloc(16, 0)); // 16-byte IV filled with zeroes
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const PATCH = auth(async (req, context) => {
  // ?? kalau tidak ada dijadikan object kosong
  const { id } = (await context.params) ?? {};

  if (!id) {
    return NextResponse.json({ success: false, message: "ID is not found" }, { status: 400 });
  }

  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    // Parse form data
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());

    // Ensure values are converted to strings
    const p_full_name = String(body.p_full_name);
    const p_phone_number = String(body.p_phone_number);
    const p_address = String(body.p_address);

    // Encrypt data
    const encryptedFullName = encryptData(p_full_name);
    const encryptedPhoneNumber = encryptData(p_phone_number);
    const encryptedAddress = encryptData(p_address);

    const { data, error } = await supabase.rpc("patch_encrypt", {
      p_encrypt_id: id,
      p_full_name: encryptedFullName,
      p_phone_number: encryptedPhoneNumber,
      p_address: encryptedAddress,
    });

    if (error) {
      console.error("Error calling patch_encrypt:", error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
