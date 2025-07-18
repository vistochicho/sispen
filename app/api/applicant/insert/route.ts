import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
// import path from "path";
import crypto from "crypto";

export const config = { api: { bodyParser: false } };

// Define schema validation for incoming request data
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
  const iv = crypto.randomBytes(16); // generate IV
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf-8"), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const encryptFile = (fileBuffer: Buffer, key: Buffer): Buffer => {
  const iv = crypto.randomBytes(16); // generate IV
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  // prepend IV to the file
  return Buffer.concat([iv, encrypted]);
};

// Fungsi logging ukuran dan waktu
function logEncryption(label: string, original: Buffer | string, encrypted: Buffer | string, timeMs: number) {
  const originalSize = typeof original === "string" ? Buffer.byteLength(original, "utf-8") : original.length;
  const encryptedSize = typeof encrypted === "string" ? Buffer.byteLength(encrypted, "utf-8") : encrypted.length;
  console.log(`=== ${label} ===`);
  console.log(`Ukuran Data Asli: ${originalSize} bytes`);
  console.log(`Ukuran Data Terenkripsi: ${encryptedSize} bytes`);
  console.log(`Waktu Enkripsi: ${timeMs.toFixed(3)} ms`);
  console.log("============================\n");
}

// Bungkus enkripsi teks dengan logger waktu & ukuran
function encryptWithLog(label: string, text: string, key: Buffer): string {
  const start = performance.now();
  const encrypted = encryptText(text, key);
  const end = performance.now();
  logEncryption(label, text, encrypted, end - start);
  return encrypted;
}

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const userId = req.auth.user.userId;
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const formData = await req.formData();

    const p_full_name = formData.get("p_full_name") as string;
    const p_email = formData.get("p_email") as string;
    const p_phone_number = parseInt(formData.get("p_phone_number") as string, 10);
    const p_address = formData.get("p_address") as string;
    const p_company_type = formData.get("p_company_type") as string;
    const p_company_name = formData.get("p_company_name") as string;
    const p_company_address = formData.get("p_company_address") as string;
    const p_company_kbli = formData.get("p_company_kbli") as string;
    const p_company_phone_number = parseInt(formData.get("p_company_phone_number") as string, 10);
    const p_company_fax_number_raw = formData.get("p_company_fax_number") as string | null;
    const p_company_fax_number = p_company_fax_number_raw ? parseInt(p_company_fax_number_raw, 10) : null;
    const p_company_authorized_capital = parseInt(formData.get("p_company_authorized_capital") as string, 10);
    const p_company_paid_up_capital = parseInt(formData.get("p_company_paid_up_capital") as string, 10);
    const p_company_executives = formData.get("p_company_executives") as string;
    const p_note = formData.get("p_note") as string | null;
    const p_package_id = formData.get("p_package_id") as string;

    const photo = formData.get("p_photo") as File;
    const ktp = formData.get("p_ktp") as File;
    const npwp = formData.get("p_npwp") as File;
    const kk = formData.get("p_kk") as File;

    // Validate request body
    const { error: validationError } = schema.validate({
      p_full_name,
      p_email,
      p_phone_number,
      p_address,
      p_company_type,
      p_company_name,
      p_company_address,
      p_company_kbli,
      p_company_phone_number,
      p_company_fax_number,
      p_company_authorized_capital,
      p_company_paid_up_capital,
      p_company_executives,
      p_note,
      p_package_id,
      photo,
      ktp,
      npwp,
      kk,
    });
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError.details[0].message }, { status: 400 });
    }

    let photoFileName;
    let ktpFileName;
    let kkFileName;
    let npwpFileName;

    if (photo && ktp && kk && npwp) {
      try {
        const fileBufferPhoto = Buffer.from(await photo.arrayBuffer());
        const fileBufferKtp = Buffer.from(await ktp.arrayBuffer());
        const fileBufferKk = Buffer.from(await kk.arrayBuffer());
        const fileBufferNpwp = Buffer.from(await npwp.arrayBuffer());

        // const encryptedPhoto = encryptFile(fileBufferPhoto, encryptionKey);
        // const encryptedKtp = encryptFile(fileBufferKtp, encryptionKey);
        // const encryptedKk = encryptFile(fileBufferKk, encryptionKey);
        // const encryptedNpwp = encryptFile(fileBufferNpwp, encryptionKey);

        const startPhoto = performance.now();
        const encryptedPhoto = encryptFile(fileBufferPhoto, encryptionKey);
        const endPhoto = performance.now();
        logEncryption("Photo", fileBufferPhoto, encryptedPhoto, endPhoto - startPhoto);

        const startKtp = performance.now();
        const encryptedKtp = encryptFile(fileBufferKtp, encryptionKey);
        const endKtp = performance.now();
        logEncryption("KTP", fileBufferKtp, encryptedKtp, endKtp - startKtp);

        const startKk = performance.now();
        const encryptedKk = encryptFile(fileBufferKk, encryptionKey);
        const endKk = performance.now();
        logEncryption("KK", fileBufferKk, encryptedKk, endKk - startKk);

        const startNpwp = performance.now();
        const encryptedNpwp = encryptFile(fileBufferNpwp, encryptionKey);
        const endNpwp = performance.now();
        logEncryption("NPWP", fileBufferNpwp, encryptedNpwp, endNpwp - startNpwp);

        const uniqueFileNamePhoto = `${uuidv4()}.enc`;
        const uniqueFileNameKtp = `${uuidv4()}.enc`;
        const uniqueFileNameKk = `${uuidv4()}.enc`;
        const uniqueFileNameNpwp = `${uuidv4()}.enc`;

        photoFileName = uniqueFileNamePhoto;
        ktpFileName = uniqueFileNameKtp;
        kkFileName = uniqueFileNameKk;
        npwpFileName = uniqueFileNameNpwp;

        const files = [
          {
            path: `document/${uniqueFileNamePhoto}`,
            file: encryptedPhoto,
          },
          {
            path: `document/${uniqueFileNameKtp}`,
            file: encryptedKtp,
          },
          {
            path: `document/${uniqueFileNameKk}`,
            file: encryptedKk,
          },
          {
            path: `document/${uniqueFileNameNpwp}`,
            file: encryptedNpwp,
          },
        ];

        const uploadPromise = files.map(({ path, file }) =>
          supabase.storage.from("folder").upload(path, file, {
            cacheControl: "0",
            upsert: false,
          })
        );

        const uploadResults = await Promise.all(uploadPromise);

        uploadResults.forEach(({ error }, idx) => {
          if (error) {
            throw new Error(`Upload failed for file: ${files[idx].path} - ${error.message}`);
          }
        });
      } catch (err) {
        console.error("Something Went Wrong", err);
      }
    }

    // const encrypted_full_name = encryptText(p_full_name, encryptionKey);
    // const encrypted_email = encryptText(p_email, encryptionKey);
    // const encrypted_phone_number = encryptText(p_phone_number.toString(), encryptionKey);
    // const encrypted_address = encryptText(p_address, encryptionKey);
    // const encrypted_company_type = encryptText(p_company_type, encryptionKey);
    // const encrypted_company_name = encryptText(p_company_name, encryptionKey);
    // const encrypted_company_address = encryptText(p_company_address, encryptionKey);
    // const encrypted_company_kbli = encryptText(p_company_kbli, encryptionKey);
    // const encrypted_company_phone_number = encryptText(p_company_phone_number.toString(), encryptionKey);
    // const encrypted_company_fax_number = p_company_fax_number !== null ? encryptText(p_company_fax_number.toString(), encryptionKey) : null;
    // const encrypted_company_authorized_capital = encryptText(p_company_authorized_capital.toString(), encryptionKey);
    // const encrypted_company_paid_up_capital = encryptText(p_company_paid_up_capital.toString(), encryptionKey);
    // const encrypted_company_executives = encryptText(p_company_executives, encryptionKey);
    // const encrypted_note = p_note ? encryptText(p_note, encryptionKey) : null;

    // Enkripsi teks + logging waktu dan ukuran
    const encrypted_full_name = encryptWithLog("Full Name", p_full_name, encryptionKey);
    const encrypted_email = encryptWithLog("Email", p_email, encryptionKey);
    const encrypted_phone_number = encryptWithLog("Phone Number", String(p_phone_number), encryptionKey);
    const encrypted_address = encryptWithLog("Address", p_address, encryptionKey);
    const encrypted_company_type = encryptWithLog("Company Type", p_company_type, encryptionKey);
    const encrypted_company_name = encryptWithLog("Company Name", p_company_name, encryptionKey);
    const encrypted_company_address = encryptWithLog("Company Address", p_company_address, encryptionKey);
    const encrypted_company_kbli = encryptWithLog("Company KBLI", p_company_kbli, encryptionKey);
    const encrypted_company_phone_number = encryptWithLog("Company Phone Number", p_company_phone_number.toString(), encryptionKey);
    const encrypted_company_fax_number =
      p_company_fax_number !== null ? encryptWithLog("Company Fax Number", p_company_fax_number.toString(), encryptionKey) : null;
    const encrypted_company_authorized_capital = encryptWithLog("Company Authorized Capital", p_company_authorized_capital.toString(), encryptionKey);
    const encrypted_company_paid_up_capital = encryptWithLog("Company Paid-up Capital", p_company_paid_up_capital.toString(), encryptionKey);
    const encrypted_company_executives = encryptWithLog("Company Executives", p_company_executives, encryptionKey);
    const encrypted_note = p_note ? encryptWithLog("Note", p_note, encryptionKey) : null;

    const { data: applicantData, error: applicantError } = await supabase.rpc("insert_applicant", {
      p_user_id: userId,
      p_photo: photoFileName,
      p_full_name: encrypted_full_name,
      p_email: encrypted_email,
      p_phone_number: encrypted_phone_number,
      p_address: encrypted_address,
      p_ktp: ktpFileName,
      p_npwp: npwpFileName,
      p_kk: kkFileName,
      p_company_type: encrypted_company_type,
      p_company_name: encrypted_company_name,
      p_company_address: encrypted_company_address,
      p_company_kbli: encrypted_company_kbli,
      p_company_phone_number: encrypted_company_phone_number,
      p_company_fax_number: encrypted_company_fax_number,
      p_company_authorized_capital: encrypted_company_authorized_capital,
      p_company_paid_up_capital: encrypted_company_paid_up_capital,
      p_company_executives: encrypted_company_executives,
      p_note: encrypted_note,
      p_package_id,
      p_created_by: req.auth.user.id,
    });

    if (applicantError) {
      return NextResponse.json({ success: false, message: applicantError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Data Inserted Successfully", data: applicantData });
  }
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
});
