import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const config = { api: { bodyParser: false } };

const schema = Joi.object({
  photo: Joi.any().allow(null),
  p_full_name: Joi.string().min(3).max(255).required(),
  p_email: Joi.string().email().required(),
  p_phone_number: Joi.number().integer().required(),
  p_address: Joi.string().min(5).required(),
  ktp: Joi.any().required(),
  kk: Joi.any().required(),
  npwp: Joi.any().required(),
  p_company_type: Joi.string().required(),
  p_company_name: Joi.string().min(3).max(255).required(),
  p_company_address: Joi.string().min(5).required(),
  p_company_kbli: Joi.string().required(),
  p_company_phone_number: Joi.number().integer().required(),
  p_company_fax_number: Joi.number().integer().allow(null),
  p_company_authorized_capital: Joi.number().integer().required(),
  p_company_paid_up_capital: Joi.number().integer().required(),
  p_company_executives: Joi.string().min(5).required(),
  p_note: Joi.string().allow(null),
  p_package_id: Joi.string().required(),
});

const encryptionKey: Buffer = Buffer.from(process.env.KEY_SECRET!, "utf-8");

const encryptText = (plainText: string, key: Buffer): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf-8"), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const encryptFile = (fileBuffer: Buffer, key: Buffer): Buffer => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
};

function logAndPush(label: string, original: Buffer | string, encrypted: Buffer | string, timeMs: number, logs: any[]) {
  const originalSize = typeof original === "string" ? Buffer.byteLength(original, "utf-8") : original.length;
  const encryptedSize = typeof encrypted === "string" ? Buffer.byteLength(encrypted, "utf-8") : encrypted.length;
  const log = {
    label,
    originalSizeKB: (originalSize / 1024).toFixed(3),
    encryptedSizeKB: (encryptedSize / 1024).toFixed(3),
    timeMs: timeMs.toFixed(3),
  };

  // console.log(`=== ${label} ===`);
  // console.log(`Ukuran Data Asli: ${log.originalSizeKB} KB`);
  // console.log(`Ukuran Data Terenkripsi: ${log.encryptedSizeKB} KB`);
  // console.log(`Waktu Enkripsi: ${log.timeMs} ms`);
  // console.log("============================\n");

  logs.push(log);
}

function encryptWithLog(label: string, text: string, key: Buffer, logs: any[]): string {
  const start = performance.now();
  const encrypted = encryptText(text, key);
  const end = performance.now();
  logAndPush(label, text, encrypted, end - start, logs);
  return encrypted;
}

export const POST = auth(async function POST(req) {
  if (!req.auth) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const logs: any[] = [];

  const {
    user: { userId, roleid, id: createdBy },
  } = req.auth;

  if (!roleid) return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });

  const formData = await req.formData();

  const fields = {
    p_full_name: formData.get("p_full_name") as string,
    p_email: formData.get("p_email") as string,
    p_phone_number: parseInt(formData.get("p_phone_number") as string, 10),
    p_address: formData.get("p_address") as string,
    p_company_type: formData.get("p_company_type") as string,
    p_company_name: formData.get("p_company_name") as string,
    p_company_address: formData.get("p_company_address") as string,
    p_company_kbli: formData.get("p_company_kbli") as string,
    p_company_phone_number: parseInt(formData.get("p_company_phone_number") as string, 10),
    p_company_fax_number: formData.get("p_company_fax_number") ? parseInt(formData.get("p_company_fax_number") as string, 10) : null,
    p_company_authorized_capital: parseInt(formData.get("p_company_authorized_capital") as string, 10),
    p_company_paid_up_capital: parseInt(formData.get("p_company_paid_up_capital") as string, 10),
    p_company_executives: formData.get("p_company_executives") as string,
    p_note: formData.get("p_note") as string | null,
    p_package_id: formData.get("p_package_id") as string,
  };

  const photo = formData.get("p_photo") as File;
  const ktp = formData.get("p_ktp") as File;
  const kk = formData.get("p_kk") as File;
  const npwp = formData.get("p_npwp") as File;

  const { error: validationError } = schema.validate({ ...fields, photo, ktp, kk, npwp });
  if (validationError) {
    return NextResponse.json({ success: false, message: validationError.details[0].message }, { status: 400 });
  }

  let photoFileName, ktpFileName, kkFileName, npwpFileName;

  try {
    const encryptAndUploadFile = async (file: File, label: string): Promise<string> => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const start = performance.now();
      const encrypted = encryptFile(buffer, encryptionKey);
      const end = performance.now();
      logAndPush(label, buffer, encrypted, end - start, logs);
      const filename = `${uuidv4()}.enc`;

      const { error } = await supabase.storage.from("folder").upload(`document/${filename}`, encrypted, {
        cacheControl: "0",
        upsert: false,
      });

      if (error) throw new Error(`Upload failed for ${label}: ${error.message}`);
      return filename;
    };

    photoFileName = await encryptAndUploadFile(photo, "Photo");
    ktpFileName = await encryptAndUploadFile(ktp, "KTP");
    kkFileName = await encryptAndUploadFile(kk, "KK");
    npwpFileName = await encryptAndUploadFile(npwp, "NPWP");
  } catch (err) {
    console.error("File upload error:", err);
    return NextResponse.json({ success: false, message: "File upload failed" }, { status: 500 });
  }

  const encryptedFields = {
    p_full_name: encryptWithLog("Full Name", fields.p_full_name, encryptionKey, logs),
    p_email: encryptWithLog("Email", fields.p_email, encryptionKey, logs),
    p_phone_number: encryptWithLog("Phone Number", fields.p_phone_number.toString(), encryptionKey, logs),
    p_address: encryptWithLog("Address", fields.p_address, encryptionKey, logs),
    p_company_type: encryptWithLog("Company Type", fields.p_company_type, encryptionKey, logs),
    p_company_name: encryptWithLog("Company Name", fields.p_company_name, encryptionKey, logs),
    p_company_address: encryptWithLog("Company Address", fields.p_company_address, encryptionKey, logs),
    p_company_kbli: encryptWithLog("Company KBLI", fields.p_company_kbli, encryptionKey, logs),
    p_company_phone_number: encryptWithLog("Company Phone Number", fields.p_company_phone_number.toString(), encryptionKey, logs),
    p_company_fax_number:
      fields.p_company_fax_number !== null ? encryptWithLog("Company Fax Number", fields.p_company_fax_number.toString(), encryptionKey, logs) : null,
    p_company_authorized_capital: encryptWithLog("Company Authorized Capital", fields.p_company_authorized_capital.toString(), encryptionKey, logs),
    p_company_paid_up_capital: encryptWithLog("Company Paid-up Capital", fields.p_company_paid_up_capital.toString(), encryptionKey, logs),
    p_company_executives: encryptWithLog("Company Executives", fields.p_company_executives, encryptionKey, logs),
    p_note: fields.p_note ? encryptWithLog("Note", fields.p_note, encryptionKey, logs) : null,
  };

  const { data, error } = await supabase.rpc("insert_applicant", {
    p_user_id: userId,
    p_photo: photoFileName,
    p_full_name: encryptedFields.p_full_name,
    p_email: encryptedFields.p_email,
    p_phone_number: encryptedFields.p_phone_number,
    p_address: encryptedFields.p_address,
    p_ktp: ktpFileName,
    p_npwp: npwpFileName,
    p_kk: kkFileName,
    p_company_type: encryptedFields.p_company_type,
    p_company_name: encryptedFields.p_company_name,
    p_company_address: encryptedFields.p_company_address,
    p_company_kbli: encryptedFields.p_company_kbli,
    p_company_phone_number: encryptedFields.p_company_phone_number,
    p_company_fax_number: encryptedFields.p_company_fax_number,
    p_company_authorized_capital: encryptedFields.p_company_authorized_capital,
    p_company_paid_up_capital: encryptedFields.p_company_paid_up_capital,
    p_company_executives: encryptedFields.p_company_executives,
    p_note: encryptedFields.p_note,
    p_package_id: fields.p_package_id,
    p_created_by: createdBy,
    p_encryption_log: JSON.stringify(logs),
  });

  console.log("test log", JSON.stringify(logs));

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Data Inserted Successfully", data });
});
